from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import os
import re

base_dir = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.abspath(os.path.join(base_dir, '../frontend'))

app = Flask(__name__, static_folder=static_dir)
CORS(app)

# Simple context memory
memory = {}

def get_memory(session_id):
    if session_id not in memory:
        memory[session_id] = {"year": None, "region": None, "group_by": None, "sort": None}
    return memory[session_id]

# Load Data
csv_path = os.path.join(base_dir, '../data/sales.csv')

def load_data():
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    return pd.DataFrame()

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/query', methods=['POST'])
def query_data():
    data = request.json
    user_query = data.get('query', '').lower()
    session_id = data.get('session_id', 'default')
    
    session = get_memory(session_id)
    df = load_data()
    if df.empty:
        return jsonify({"error": "Data file not found or empty."}), 400

    # Reset memory on explicit command
    if "reset" in user_query or "clear" in user_query:
        memory[session_id] = {"year": None, "region": None, "group_by": None, "sort": None}
        session = memory[session_id]
        return jsonify({"message": "Context reset! You can start a new query.", "data": [], "chart": {"labels":[], "values":[]}, "insights": ""})

    # Year Parsing
    years = re.findall(r'\b(2023|2024)\b', user_query)
    if years:
        session['year'] = int(years[-1])
            
    # Region Parsing
    regions = ['north', 'south', 'east', 'west']
    found_regions = [r for r in regions if r in user_query]
    if found_regions:
        session['region'] = found_regions[0].capitalize()

    # Grouping parsing
    if "by region" in user_query:
        session['group_by'] = 'region'
    elif "by product" in user_query:
        session['group_by'] = 'product'
    elif "by month" in user_query:
        session['group_by'] = 'month'
    elif "compare" in user_query and "2023" in user_query:
        # A simple hack for comparison request
        session['group_by'] = 'year'
        session['year'] = None # Clear year filter to see both years
        
    if "top" in user_query:
        session['sort'] = "top"
        
    # Apply Filters
    if session['year']:
        df = df[df['year'] == session['year']]
            
    if session['region']:
        df = df[df['region'].str.lower() == session['region'].lower()]

    # Apply Aggregation
    if session['group_by']:
        grouped = df.groupby(session['group_by'])['sales'].sum().reset_index()
        chart_labels = grouped[session['group_by']].astype(str).tolist()
        chart_data = grouped['sales'].tolist()
        table_data = grouped.to_dict(orient='records')
        insight = f"Displays total sales grouped by {session['group_by']}."
        if not grouped.empty:
            max_row = grouped.loc[grouped['sales'].idxmax()]
            insight += f" Highest performing {session['group_by']} is {max_row[session['group_by']]} with ${max_row['sales']}."
    else:
        # Default view is product groupings if no explicit table asked
        grouped = df.groupby('product')['sales'].sum().reset_index()
        if session['sort'] == 'top':
            grouped = grouped.sort_values(by='sales', ascending=False).head(5)
            insight = "Showing top products by sales."
        else:
            insight = "Showing total sales by product."
            
        chart_labels = grouped['product'].tolist()
        chart_data = grouped['sales'].tolist()
        table_data = grouped.to_dict(orient='records')
    
    # State string for context awareness confirmation
    state_str = []
    if session['year']: state_str.append(f"Year: {session['year']}")
    if session['region']: state_str.append(f"Region: {session['region']}")
    if session['group_by'] == 'year': state_str.append("Comparing Years")
    context_msg = "Data filtered for: " + (", ".join(state_str) if state_str else "All Data (No specific filters)")

    response = {
        "message": context_msg,
        "data": table_data,
        "chart": {
            "labels": chart_labels,
            "values": chart_data
        },
        "insights": insight
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=8040)

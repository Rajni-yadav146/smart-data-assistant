# DB Whisperer / Smart Data Assistant

A futuristic, AI-powered conversational data analytics platform leveraging the **Synapse Design System**.

## Project Structure

This project is organized into a clean, modular architecture:

- **`/client`**: The primary Next.js (App Router) frontend utilizing Tailwind v4 and the Synapse Design System.
- **`/server`**: The Python FastAPI/Flask backend responsible for LLM query processing and anomaly detection.
- **`/data`**: Centralized storage for datasets (e.g., `sales.csv`).
- **`/client-legacy`**: The original vanilla HTML/JS/CSS frontend for lightweight reference.
- **`/docs`**: Project design specifications and API documentation.

## Getting Started

### 1. Run the Backend Server
Navigate to the server directory and install dependencies:
```bash
cd server
pip install -r requirements.txt
python app.py
```
*The server will start on `http://127.0.0.1:8040` by default.*

### 2. Run the Next.js Frontend
Navigate to the client directory and start the dev server:
```bash
cd client
npm install
npm run dev
```
*The web interface will be available at `http://localhost:3000`.*

## Features
- **Natural Language to Data**: Ask questions in plain English.
- **Synapse UI**: Stunning dark-themed aesthetics with live particle animations.
- **Deep Insights**: ML-driven anomaly detection and intelligent data summaries.
- **Interactive Visualizations**: Real-time charts and data tables.

---
*Created as part of the Synapse Design System implementation.*

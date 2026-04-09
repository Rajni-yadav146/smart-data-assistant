let chartInstance = null;

function setQuery(element) {
    document.getElementById('queryInput').value = element.innerText;
    sendQuery();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendQuery();
    }
}

function appendMessage(text, sender) {
    const chatHistory = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerText = text;
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function sendQuery() {
    const inputField = document.getElementById('queryInput');
    const query = inputField.value.trim();
    
    if (!query) return;

    // Add user message to chat
    appendMessage(query, 'user');
    inputField.value = '';

    try {
        // Assume backend is running locally on port 8040
        const response = await fetch('http://127.0.0.1:8040/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query, session_id: 'local_user' })
        });

        const result = await response.json();
        
        if (response.ok) {
            appendMessage(result.message, 'assistant');
            document.getElementById('insightText').innerText = result.insights || "No specific insights generated.";
            updateChart(result.chart.labels, result.chart.values, "Sales Data");
            updateTable(result.data);
        } else {
            appendMessage("Error: " + result.error, 'assistant');
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        appendMessage("Sorry, I could not connect to the backend. Please ensure the Flask app is running.", 'assistant');
    }
}

function updateChart(labels, data, label) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Determine chart type based on whether data represents years
    let chartType = 'bar';
    if (labels.length > 0 && (labels[0] === '2023' || labels[0] === '2024')) {
        chartType = 'line';
    }

    chartInstance = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
                borderColor: 'rgba(79, 70, 229, 1)',
                borderWidth: 2,
                borderRadius: chartType === 'bar' ? 4 : 0,
                tension: 0.3,
                fill: chartType === 'line' ? true : false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#F3F4F6' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

function updateTable(data) {
    const thead = document.getElementById('tableHeader');
    const tbody = document.getElementById('tableBody');
    
    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (!data || data.length === 0) return;

    // Create headers
    const cols = Object.keys(data[0]);
    cols.forEach(col => {
        const th = document.createElement('th');
        th.innerText = col.charAt(0).toUpperCase() + col.slice(1);
        thead.appendChild(th);
    });

    // Create rows
    data.forEach(row => {
        const tr = document.createElement('tr');
        cols.forEach(col => {
            const td = document.createElement('td');
            td.innerText = row[col];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

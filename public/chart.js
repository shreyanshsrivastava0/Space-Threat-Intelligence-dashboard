document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('threatChart').getContext('2d');

    const labels = [];
    const data = [];

    const threatChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Threats',
                data: data,
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.2)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: { title: { display: true, text: 'Time' } },
                y: { title: { display: true, text: 'Threat Count' }, beginAtZero: true }
            }
        }
    });

    function getFakeThreatCount() {
        return Math.floor(Math.random() * 5);
    }

    setInterval(() => {
        const now = new Date().toLocaleTimeString();
        const threatCount = getFakeThreatCount();

        labels.push(now);
        data.push(threatCount);

        if(labels.length > 10) labels.shift();
        if(data.length > 10) data.shift();

        threatChart.update();
    }, 5000);
});

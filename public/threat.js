document.addEventListener("DOMContentLoaded", () => {
    // Map initialization
    console.log("threat.js loaded");
        if (map !== undefined) {
            map.remove();
        }

    map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const updatesList = document.getElementById("updates-list");
    const satelliteList = document.getElementById("satellite-list");
    const riskSummary = document.getElementById("risk-summary");

    const satellites = ["Hubble Telescope", "ISS", "WeatherSat-5", "GPS-Sat"];
    let markers = []; // Track map markers

    // Generate a random threat
    function generateThreat() {
        const types = ["Collision Risk", "Debris Detected", "Meteor Alert"];
        const severities = ["Low", "Medium", "High"];
        const lat = (Math.random() * 180 - 90).toFixed(2);
        const lon = (Math.random() * 360 - 180).toFixed(2);
        const type = types[Math.floor(Math.random() * types.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        return { type, severity, lat, lon };
    }

    // Marker color by severity
    function getMarkerColor(severity) {
        if (severity === "High") return "red";
        if (severity === "Medium") return "orange";
        return "green";
    }

    function updateDashboard() {
        const threat = generateThreat();
        const time = new Date().toLocaleTimeString();

        // Live Updates 
        const li = document.createElement("li");
        li.textContent = `[${time}] ${threat.type} - Severity: ${threat.severity}`;
        updatesList.prepend(li);
        while (updatesList.children.length > 5) {
            updatesList.removeChild(updatesList.lastChild);
        }

        // Satellite Status
        satelliteList.innerHTML = satellites.map(sat => {
            const status = Math.random() > 0.2 ? "Operational" : "Minor Issue";
            return `<p><strong>${sat}</strong>: ${status}</p>`;
        }).join("");

        //  Risk Analysis 
        const riskCount = Math.floor(Math.random() * 5);
        riskSummary.innerHTML = `<p>Current High-Risk Threats: ${riskCount}</p>`;

        // Add marker to map 
        const color = getMarkerColor(threat.severity);
        const marker = L.circleMarker([threat.lat, threat.lon], {
            radius: 8,
            fillColor: color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        marker.bindPopup(`<strong>${threat.type}</strong><br>Severity: ${threat.severity}<br>Lat: ${threat.lat}, Lon: ${threat.lon}`);

        markers.push(marker);

        // Remove old markers if more than 20
        if (markers.length > 20) {
            const oldMarker = markers.shift();
            map.removeLayer(oldMarker);
        }
    }

    setInterval(updateDashboard, 4000);

    updateDashboard();
});

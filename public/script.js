// const socket = io();
console.log("JavaScript file is running!");


   var map = L.map('map').setView([20, 0], 2);

        // Add base layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Example marker
        L.marker([28.6139, 77.2090])
            .addTo(map)
            .bindPopup("<b>ISRO HQ</b><br>Tracking space threats from India.");

 document.addEventListener("DOMContentLoaded", function (){
   
const nav = document.querySelector(".nav");
const hemispherenav = document.getElementById("hemispherenav");
 nav.addEventListener("click",(event)=>{
    event.preventDefault();
    event.stopPropagation();
    hemispherenav.classList.toggle("show");
    console.log("nav icon clicked");
   
 document.addEventListener("click", function () {
        hemispherenav.classList.remove("show");
    });

 });

});

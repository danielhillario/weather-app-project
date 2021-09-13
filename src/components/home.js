const { useState, useEffect } = require("react");
const Leaf = require("leaflet");

function Home() {
    useEffect(function () {
        
        const myMap = Leaf.map('weatherMap').setView([0, 0], 2);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = Leaf.tileLayer(tileURL, { crossOrigin: "true", attribution });

        const mapIcon = Leaf.divIcon({
            className: "map-div-icon",
            html: "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='28' fill='red' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'> <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/> </svg>",
        });

        tiles.addTo(myMap);
        Leaf.marker([0,0], {icon: mapIcon}).addTo(myMap);
    });
        

    return (
        <div className="container">
            <div id="weatherMap"></div>

            <div className="container d-flex justify-content-center pt-3 w-75">
                <h3>Current weather here</h3>
            </div>
        </div>
            

    
    )    
}

module.exports = Home;
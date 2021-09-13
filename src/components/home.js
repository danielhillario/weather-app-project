const { useState, useEffect } = require("react");
const Leaf = require("leaflet");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [weather, setWeather] = useState(null);

    function handleWeatherData(data) {
        if (data != null) {
            console.log(data);
        }
    }

    handleWeatherData(weather);

    navigator.geolocation.getCurrentPosition(fetchLocation);

    const latlon = [];

    function fetchLocation(pos) {
        let crd = pos.coords;
        
        let lat = crd.latitude;
        let lon = crd.longitude;

        latlon.push(lat, lon);
    }

    

    useEffect(function () {
        
        const myMap = Leaf.map('weatherMap').setView([0,0], 2);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = Leaf.tileLayer(tileURL, { crossOrigin: "true", attribution });

        const mapIcon = Leaf.divIcon({
            className: "map-div-icon",
            html: "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='28' fill='red' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'> <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/> </svg>",
        });

        tiles.addTo(myMap);
        Leaf.marker([2,103], {icon: mapIcon}).addTo(myMap);
    }); // End of useEffect for leaflet map
        

        // let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
        // let query = `lat=2&lon=102&appid=${openWeatherApiKey}&units=metric`;
        
        // fetch(openWeatherUrl + query, {
        //     method: "GET",
        // }).then(function (res) {
        //     return res.json();
        // }).then(function (weatherData) {
        //     setWeather(weatherData);
        // });    


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
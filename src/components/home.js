const { useState, useEffect } = require("react");
const Leaf = require("leaflet");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [data, setData] = useState(null);
    const [time, setTime] = useState(0);

    let divCurrWeather = document.querySelector("div#currentweather");
    if (data != null) {
        let currCity = data.name;
        let currTitle = document.createElement("h3");
        currTitle.innerHTML = `Current ${currCity} Weather`;
        divCurrWeather.append(currTitle);
    }
    
    const latlon = [];
    navigator.geolocation.getCurrentPosition(function (pos) {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        latlon.push(lat, lon);

    });

    useEffect(async function () {
        setTimeout(function () {
            setTime(time + 1);
        }, 1000);

        let lat = latlon[0];
        let lon = latlon[1];

        // console.log(lat, lon);

        const myMap = Leaf.map('weatherMap').setView([lat, lon], 2);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = Leaf.tileLayer(tileURL, { crossOrigin: "true", attribution });

        const mapIcon = Leaf.divIcon({
            className: "map-div-icon",
            html: "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='28' fill='red' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'> <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/> </svg>",
        });

        tiles.addTo(myMap);
        Leaf.marker([lat, lon], { icon: mapIcon }).addTo(myMap);
    }, [time]); // End of useEffect for leaflet map
    

    useEffect(async function () {
        const abortController = new AbortController();

        let lat = latlon[0];
        let lon = latlon[1];

        let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
        let query = `lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
        let mounted = true;
        fetch(openWeatherUrl + query, {
            signal: abortController.signal,
            method: "GET",
        }).then(function (res) {
            return res.json();
        }).then(function (weatherData) {
            setData(weatherData);
        });

        return function () {
            abortController.abort();
        }
    
    }, []);
    

    return (
        <div className="container">
            <div className="row">
                <div className="col-7">
                    <div id="weatherMap"></div>
                </div>

                <div className="col">
                    <div className="container d-flex justify-content-center pt-3 w-75" id="currentweather">
                    
                    </div>
                </div>
            </div> 
        </div>
    )    
}

module.exports = Home;
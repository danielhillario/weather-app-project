const { useState, useEffect, useRef } = require("react");
const L = require("leaflet");


const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [data, setData] = useState(null);
    const latlon = [];


    function getPosition (position) {
        const pos = position.coords;
        latlon.push(pos.latitude, pos.longitude);
    }

    function showError (error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the geolocation request");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }

     navigator.geolocation.getCurrentPosition(getPosition, showError);


    let divCurrCity = document.querySelector("div#currentCity");
    if (data != null) {
        console.log(data);
        let currCity = data.name;
        let currTitle = document.createElement("h5");
        currTitle.innerHTML = `Current ${currCity} Weather`;
        divCurrCity.append(currTitle);
        
        //GET time from api
        let unixTimeStamp = data.dt;
        const mSeconds = unixTimeStamp * 1000;
        const dateObject = new Date(mSeconds);
        const newDateFormat = dateObject.toLocaleString(
            "en-GB",{
                timeStyle: "short",
                hour12: "true"
            }
        );

        //GET current weather condition
        let currWeather = data.weather;
        let currWeatherDesc = null;

        for(let i = 0 ; i < currWeather.length; i += 1){
            currWeatherDesc = currWeather[i].description;
        }
        
        let currTemp = Math.round(data.main.temp);

        let divCurrWeather = document.querySelector("div#currentWeather");
        let currentWeather = document.createElement("h6");
        currentWeather.innerHTML = `${newDateFormat}, ${currWeatherDesc}`;
        divCurrWeather.append(currentWeather);

        let divCurrTemp = document.querySelector("p#currTemp");
        divCurrTemp.innerHTML = `${currTemp}`;
        
        let currHumid = data.main.humidity;

        let divCurrHumid = document.querySelector("a#currentHumidity");
        divCurrHumid.innerHTML = `${currHumid}% humidity`;

        let currWindSpd = data.wind.speed;
        currWindSpd = Math.round(currWindSpd * 3.6);

        let divCurrWindSpd = document.querySelector("a#currentWindSpeed");
        divCurrWindSpd.innerHTML = `${currWindSpd} km/h winds`;
        

    }

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

    useEffect(() => {
        
        let mapContainer = L.DomUtil.get('map');

        if(mapContainer !== null){
            mapContainer._leaflet_id = null;
        }

        let map = L.map('map').setView([latlon[0], latlon[1]], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        L.marker([latlon[0], latlon[1]]).addTo(map);

    }, []);


    return (
        <div className="container">
            <section className="mx-auto my-5" style={{maxWidth: '23rem'}}>
                <div className="card shadow">
                    <div className="card-body">
                        <div className="card-title font-weight-bold" id="currentCity"></div>
                        <div className="card-subtitle mb-2 text-muted" id="currentWeather"></div>
                        <div className="d-flex justify-content-between">
                            <p className="display-1 degree" id="currTemp"></p>
                            <i className="fas fa-sun fa-5x pt-3 text-warning"></i>
                        </div>
                    
                        <div className="d-flex justify-content-between mb-4">
                        <p><i className="fas fa-tint fa-lg text-info pe-2"/><a id="currentHumidity" /></p>
                        <p><i className="fas fa-leaf fa-lg text-muted pe-2"></i><a id="currentWindSpeed" /></p>
                        </div>

                    </div>
                </div>
            </section>

            <div className="mx-auto mt-5 mb-5" id="map">

            </div>


        </div>
    );    
}

module.exports = Home;
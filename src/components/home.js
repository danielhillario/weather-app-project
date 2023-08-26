const { useState, useEffect } = require("react");
//const Leaf = require("leaflet");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [data, setData] = useState(null);

    let divCurrWeather = document.querySelector("div#currentweather");
    if (data != null) {
        console.log(data);
        let currCity = data.name;
        let currTitle = document.createElement("h3");
        currTitle.innerHTML = `Current ${currCity} Weather`;
        divCurrWeather.append(currTitle);

        let unixTimeStamp = data.dt;
        const mSeconds = unixTimeStamp * 1000;
        const dateObject = new Date(mSeconds);
        const newDateFormat = dateObject.toLocaleString(
            "en-GB",{
                dateStyle: "long",
                timeStyle: "medium",
                hour12: "true"
            }
        );

        let divCurrTime = document.querySelector("div#time");
        let currTime = document.createElement("h4");
        currTime.innerHTML = `${newDateFormat}`;
        divCurrTime.append(currTime);

    }
    
    const latlon = [];
    
    
    function getPosition (position) {
        const pos = position.coords;

        latlon.push(pos.latitude, pos.longitude);
    }

    navigator.geolocation.getCurrentPosition(getPosition);

    console.log(latlon);

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

                <div className="col">
                    <div className="container d-flex text-center" id="currentweather">

                    </div>

                    <div className="row">
                        <div className="container text-center" id="time"></div>
                    </div>

                    <div className="row" id="currWeather">
                        <div className="container" id="currWeather"></div>
                    </div>

                </div>

                <div className="col-7">
                    <div id="weatherMap"></div>
                </div>
                
            </div> 
        </div>
    )    
}

module.exports = Home;
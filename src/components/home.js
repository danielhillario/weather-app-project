const { useState, useEffect } = require("react");
//const Leaf = require("leaflet");

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
    
    let lat = 3.171322;//pos.coords.latitude;
    let lon = 113.041908;//pos.coords.longitude;

    latlon.push(lat, lon);
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
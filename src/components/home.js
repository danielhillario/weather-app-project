const { useState, useEffect } = require("react");
//const Leaf = require("leaflet");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [data, setData] = useState(null);

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
        
        console.log(currWeatherDesc);

        let divCurrWeather = document.querySelector("div#currentWeather");
        let currentWeather = document.createElement("h6");
        currentWeather.innerHTML = `${newDateFormat}, ${currWeatherDesc}`;
        divCurrWeather.append(currentWeather);
        

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
        <div className="container-fluid">

            <div className="card" style={{width: '500px'}}>
                <div className="card-body">
                    <div className="card-title" id="currentCity"></div>
                    <div className="card-subtitle mb-2 text-muted" id="currentWeather"></div>

                </div>

            </div>
           
        </div>
    )    
}

module.exports = Home;
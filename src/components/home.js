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
    
    const latlon = [];
    
    
    function getPosition (position) {
        const pos = position.coords;

        latlon.push(pos.latitude, pos.longitude);
    }

    navigator.geolocation.getCurrentPosition(getPosition);

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

            <section className="mx-auto mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <p>A Map!</p>
                    </div>
                </div>
            </section>


        </div>
    )    
}

module.exports = Home;
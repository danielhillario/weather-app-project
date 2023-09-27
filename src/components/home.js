const { useState, useEffect, useRef } = require("react");
const L = require("leaflet");


const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Home() {

    const [data, setData] = useState(null);

    function findPosition(){
        return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
        );
    }

    let divCurrCity = document.querySelector("div#currentCity");
    if (data != null) {
        console.log(data);
        let currCity = data.name;
        let currTitle = document.createElement("h5");
        currTitle.innerHTML = `${currCity}`;
        divCurrCity.append(currTitle);
        
        //GET time from api
        let unixTimeStamp = data.dt;
        const mSeconds = unixTimeStamp * 1000;
        const dateObject = new Date(mSeconds);
        const time = dateObject.toLocaleString(
            "en-GB",{
                timeStyle: "short",
                hour12: "true"
            }
        );

        const day = dateObject.toLocaleString(
            "en-GB",{
                weekday: "short",
            }
        )

        //GET current weather condition
        let currWeather = data.weather;
        let currWeatherDesc = null;

        for(let i = 0 ; i < currWeather.length; i += 1){
            currWeatherDesc = currWeather[i].description;
        }
        
        let currTemp = Math.round(data.main.temp);
        let wIcon = currWeather[0].icon;

        let divCurrWeather = document.querySelector("div#currentWeather");
        let currentWeather = document.createElement("h6");
        currentWeather.innerHTML = `${day}, ${time}, ${currWeatherDesc}`;
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

        let divIcon = document.querySelector("div#weatherIcon");
        divIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${wIcon}@2x.png" />`;
        

    }

    useEffect(async function () {
        const abortController = new AbortController();

        // Using await to get geoposition
        try{
            let position = await findPosition();
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
            let query = `lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`;
            let mounted = true;
            await fetch(openWeatherUrl + query, {
                signal: abortController.signal,
                method: "GET",
            }).then(function (res) {
                return res.json();
            }).then(function (weatherData) {
                setData(weatherData);
            }).catch(err => console.log(err));

        } catch(err) {
            alert('Error: ' + err.message)
        }

        return function () {
            abortController.abort();
        }
    
    }, []);

    useEffect(async function () {

        // Using await function to get geoposition
        try {
            let position = await findPosition();
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let mapContainer = L.DomUtil.get('map');

            if(mapContainer !== null){
                mapContainer._leaflet_id = null;
            }

            let map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            L.marker([lat, lon]).addTo(map);
        } catch(err) {
            alert('Error: ' + err.message)
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
                            {/* <i className="fas fa-sun fa-5x pt-3 text-warning"></i> */}                       
                            <div id="weatherIcon"></div>
                        </div>
                    
                    <div className="container">
                        <div className="row d-flex flex-row">
                            <div className="col d-flex flex-column mb-3">
                                <p><i className="fas fa-droplet fa-lg text-info pe-2"/><a id="currentHumidity" /> </p>
                                <p><i className="fas fa-wind fa-lg text-muted pe-2"></i><a id="currentWindSpeed" /></p>
                            </div>

                            <div className="col d-flex flex-column mb-3">
                                <p><i className="fas fa-droplet fa-lg text-info pe-2"/>Hello World</p>
                                <p><i className="fas fa-wind fa-lg text-muted pe-2"></i>Hello World</p>
                            </div>
                        </div>
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
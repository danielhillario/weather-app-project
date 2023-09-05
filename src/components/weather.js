const { useState, useEffect } = require("react");
const Home = require("./home");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    function handleWeatherData(data) {
        
        if (data !== null) {
            let nCity = data.city.name;
            let cCountry = data.city.country;
            
            let aCity = document.querySelector("a#cityName");
            aCity.innerHTML = `${nCity}, ${cCountry}`;

            const dataObjArr = [];

            // forEach for accessing the fetched data and store them in an array
            data.list.forEach(function (list) {
                // Time
                let unixTimeStamp = list.dt;
                const mSeconds = unixTimeStamp * 1000;
                const dateObject = new Date(mSeconds);
                
                let mainTemp = Math.round(list.main.temp);
                let feelTemp = Math.round(list.main.feels_like);
                let forecastWeather = list.weather[0].main;
                let descWeather = list.weather[0].description;
                
                const setDate = dateObject.toLocaleString("en-GB", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }); // End of dateObject

                const setTime = dateObject.toLocaleString("en-GB", {
                    hour: "numeric",
                    hour12: "true",
                    minute: "numeric"
                });
                
                dataObjArr.push(
                    {
                        date: setDate,
                        time: setTime,
                        temp: mainTemp,
                        feel: feelTemp,
                        fWeather: forecastWeather,
                        dWeather: descWeather,
                    }); // End of array push method

                // Temperature
                
            }) // End of forEach initialization

            String.prototype.capitalize = function () {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }
            
            let dateColumn = document.querySelector("div#dateColumn");
            dateColumn.innerHTML = "";
            for (let i = 0; i < dataObjArr.length; i += 1){
                    if (dataObjArr[i].time.match("11:00 am") !== null) {
                        let divCol = document.createElement("div");
                        divCol.className = "col";
                        divCol.innerHTML = `
                            <div class="card shadow">
                                <div class="card-body">

                                <div class="card-title fw-bold">${dataObjArr[i].date}</div>
                                    <div class="card-subtitle mb-2 text-muted">Hello World</div>
                                    <div class="d-flex justify-content-between">
                                        <p class="display-1 degree">${dataObjArr[i].temp}</p>
                                        <i class="fas fa-sun fa-5x pt-3 text-warning"></i>
                                    </div>
                    
                                    <div class="d-flex justify-content-between mb-4">
                                        <p><i class="fas fa-tint fa-lg text-info pe-2"></i><a>${dataObjArr[i].fWeather}</a></p>
                                        <p><i class="fas fa-leaf fa-lg text-muted pe-2"></i><a>${dataObjArr[i].dWeather.capitalize()}</a></p>
                                    </div>
                                </div>
                            </div>       
                        `; // End of innerhtml
                        dateColumn.append(divCol);
                
            // } // End of for loop
                    }
                }               
        }
    }
        
    handleWeatherData(weather);    
    
    function updateCity(event) {
        event.preventDefault();
        setCity(event.target.value);
    }

    function getCityWeather(event) {
        event.preventDefault();
        let openWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?`;
        let query = `q=${city}&appid=${openWeatherApiKey}&units=metric`;
        
        fetch(openWeatherUrl + query, {
            method: "GET",
        }).then(function (res) {
            return res.json();
        }).then(function (weatherData) {
            setWeather(weatherData);
        });

    }


    return (
        <div className="container-fluid mb-5">
            <div className="container pt-3 w-75">
                <form className="input-group flex-nowrap" onSubmit={getCityWeather} >
                    <input className="form-control form-control-lg" type="text" placeholder="Search City" value={city} onChange={updateCity} aria-label=".form-control-lg" />
                    <button className="input-group-text" id="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>

            <div className="container-fluid pt-3 w-100">
                    <h2 className="d-flex justify-content-center">5 Day Weather Forecast</h2>
            </div>

            <div className="container-fluid w-100">
                    <a className="d-flex justify-content-center" id="cityName"></a>
            </div>
            
            <div className="container-fluid pt-1">               
                <div className="row row-cols-1 row-cols-md-2 g-4" id="dateColumn">

                </div>
            </div>
        </div>
    )
}

module.exports = Weather;
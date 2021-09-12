const { useState, useEffect } = require("react");
const Home = require("./home");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    function handleWeatherData(data) {
        
        if (data !== null) {
            console.log(data);
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
                const newDateFormat = dateObject.toLocaleString();
                
                let mainTemp = list.main.temp;
                let 
                
                const dateTime = dateObject.toLocaleString("en-GB", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    hour12: "true",
                    minute: "numeric",
                });
                
                dataObjArr.push(
                    {
                        time: dateTime,
                        temp: mainTemp,
                    });

                // Temperature
                
            }) // End of function
            
            let dateColumn = document.querySelector("div#dateColumn");
            dateColumn.innerHTML = "";
            // for (let j = 0; j < date.length; j += 1){
                for (let i = 0; i < dataObjArr.length; i += 1){
                    if (dataObjArr[i].time.match("8:00 am") !== null) {
                        let divCol = document.createElement("div");
                        divCol.className = "col";
                        divCol.innerHTML = `
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">${dataObjArr[i].time}</h5>
                                    <p class="card-text">Temperature: ${dataObjArr[i].temp}\u2103</p>
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
        <div className="container-fluid">
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
                    <a className="d-flex justify-content-center" id="cityName">City Name</a>
            </div>
            
            <div className="container-fluid pt-1">               
                <div className="row row-cols-1 row-cols-md-2 g-4" id="dateColumn">

                </div>
            </div>
        </div>
    )
}

module.exports = Weather;
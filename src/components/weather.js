const { useState, useEffect } = require("react");

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    function handleWeatherData(data) {
        
        if (data !== null) {
            console.log(data);
            let aCity = document.querySelector("h2.city");
            let forecast = document.querySelector("div.forecast");
            forecast.innerHTML = "";
            
            let cityName = data.city.name;
            aCity.innerHTML = cityName;


            data.list.forEach(function (list) {
                let dayTime = list.dt_txt;
                let mainTemp = list.main.temp;
                
                let div = document.createElement("div.weatherforecast");
                div.innerHTML = `<h3>Date/Time: ${dayTime}</h3>
                                <p>Temperature: ${mainTemp}</p>`;
                forecast.appendChild(div);
            })

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
        <div className="container">
            <div className="container-fluid w-75 ">
                <form className="input-group flex-nowrap" onSubmit={getCityWeather} >
                    <input className="form-control form-control-lg" type="text" placeholder="Search City" value={city} onChange={updateCity} aria-label=".form-control-lg" />
                    <span className="input-group-text" id="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </span>
                </form>
            </div>

            <div className="container p-3">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    
                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                
                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                </div>
                
                <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

module.exports = Weather;
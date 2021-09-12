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

            const dateTimeArr = [];
            const weekDayArr = [];
            const dtArr = [];
            const timeArr = [];

            data.list.forEach(function (list) {
                let unixTimeStamp = list.dt;
                const mSeconds = unixTimeStamp * 1000;
                const dateObject = new Date(mSeconds);
                const newDateFormat = dateObject.toLocaleString();
                // console.log(newDateFormat);
                
                const dateTime = dateObject.toLocaleString("en-GB", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                });
                
                dateTimeArr.push(dateTime);

                // const weekDay = dateObject.toLocaleString("en-GB", {
                //     weekday: "long",
                // });

                // weekDayArr.push(weekDay);

                // const date = dateObject.toLocaleString("en-GB", {
                //     month: "long",
                //     day: "numeric",
                //     year: "numeric",
                // });
                
                // dtArr.push(date);

                // const time = dateObject.toLocaleString("en-GB", {
                //     hour: "numeric",
                //     minute: "numeric",
                //     second: "numeric",
                // });
                
                // timeArr.push(time);

            }) // End of function

            // console.log(dateTimeArr);
            const date = [];
            for (let i = 0; i < dateTimeArr.length; i += 1){
                if (dateTimeArr[i].match("08:00:00") !== null) {
                    date.push(dateTimeArr[i]);
                }
            }

            console.log(date);

            // console.log(weekDayArr);
            // console.log(dtArr);
            // console.log(timeArr);
            
            // for (let i = 0; i < timeArr.length; i += 1){
            //     if (timeArr[i] === "") {
                    
            //     }
            // }

            // for (let i = 0; i < dtArr.length; i += 1){
            //     //console.log(`This ran i ${i}`);
            //     for (let j = 0; j < dtArr[i].length; j += 1){
            //         if (dtArr[i][j] === "Monday") {
            //             console.log(`Weekday: ${dtArr[i][j]}`);
            //         }
            //     }
            // }
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
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    
                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title" id="date1">Date-1</h5>
                                <p className="card-text">3-Hour-Forecast</p>
                                <div className="row row-cols-3">                                        
                                        <div className="col">
                                            <div className="card">
                                                <p>First 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                                <div className="card">
                                                    <p>Second 3-hour</p>
                                                </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                                <div className="card">
                                                    <p>Third 3-hour</p>
                                                </div>                                        
                                        </div>                                                                            
                                    </div>
                            </div>
                        </div>
                    </div> {/* End of column 1 */}

                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title" id="date2">Date-2</h5>
                                <p className="card-text">3-Hour-Forecast</p>

                                <div className="row row-cols-3">                                        
                                        <div className="col">
                                            <div className="card">
                                                <p>First 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                                <div className="card">
                                                    <p>Second 3-hour</p>
                                                </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                                <div className="card">
                                                    <p>Third 3-hour</p>
                                                </div>                                        
                                        </div>                                                                            
                                    </div>
                            </div>
                        </div>
                    </div> {/* End of column 2 */}
                
                    <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title" id="date3">Date-3</h5>
                                <p className="card-text">3-Hour-Forecast</p>
                                    <div className="row row-cols-3">                                        
                                        <div className="col">
                                            <div className="card">
                                                <p>First 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Second 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Third 3-hour</p>
                                            </div>                                        
                                        </div>                                                                            
                                    </div>
                            </div>
                        </div>
                    </div> {/* End of column 3 */}
                
                <div className="col">
                        <div className="card h-100">
                            {/* image goes here */}
                            <div className="card-body">
                                <h5 className="card-title" id="date4">Date-4</h5>
                                <p className="card-text">3-Hour-Forecast</p>
                                <div className="row row-cols-3">                                        
                                        <div className="col">
                                            <div className="card">
                                                <p>First 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Second 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Third 3-hour</p>
                                            </div>                                        
                                        </div>                                                                            
                                    </div>
                            </div>
                        </div>
                </div> {/* End of column 4 */}

                <div className="col">
                    <div className="card h-100">
                        {/* image goes here */}
                        <div className="card-body">
                            <h5 className="card-title" id="date5">Date-5</h5>
                                <p className="card-text">3-Hour-Forecast</p>
                                <div className="row row-cols-3">                                        
                                        <div className="col">
                                            <div className="card">
                                                <p>First 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Second 3-hour</p>
                                            </div>                                        
                                        </div>
                                    
                                        <div className="col">
                                            <div className="card">
                                                <p>Third 3-hour</p>
                                            </div>                                        
                                        </div>                                                                            
                                    </div>
                        </div>
                    </div>
                </div> {/* End of column 5 */}

                </div>
            </div>
        </div>
    )
}

module.exports = Weather;
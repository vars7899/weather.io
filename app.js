const api = {
    key: "e4d20fa39c41b05005a81bd12f180456",
    url: "http://api.openweathermap.org/data/2.5/",
    icon: "http://openweathermap.org/img/wn/",
};

const searchbox = document.querySelector(".srch-input");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        getForecast(searchbox.value);
        const hiden = document.querySelector(".hiden");
        hiden.classList.remove("hiden");
    }
}

function getResults(query) {
    fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResult);
}
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
function getForecast(lat, lon) {
    fetch(
        `${api.url}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
    )
        .then((forecast) => {
            return forecast.json();
        })
        .then(displayForecast);
}
function displayResult(weather) {
    console.log(weather);
    let lat = weather.coord.lat;
    let lon = weather.coord.lon;
    getForecast(lat, lon);
    let city = document.querySelector(".location");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let temp = document.querySelector(".box2");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector(".box1");
    let icon_data = weather.weather[0].icon;
    weather_el.innerHTML = `<img src ="./icons/${icon_data}.png"/>`;
    let type = document.querySelector(".weatherType");
    type.innerHTML = `${weather.weather[0].main}`;
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `${weather.main.humidity} %`;
    let wind = document.querySelector(".wind");
    wind.innerHTML = `${weather.wind.speed} meter/sec`;
    let pressure = document.querySelector(".pressure");
    pressure.innerHTML = `${weather.main.pressure} hPa`;
    let visibilty = document.querySelector(".visibilty");
    visibilty.innerHTML = `${weather.main.temp_min} Km`;
    let min = document.querySelector(".min");
    min.innerHTML = `${Math.round(weather.main.temp_min)} °c`;
    let max = document.querySelector(".max");
    max.innerHTML = `${Math.round(weather.main.temp_max)} °c`;
}

function displayForecast(forecast) {
    console.log(forecast);
    for (let i = 1; i < 8; i++) {
        let day = document.querySelector(`.date${i}`);
        const date = forecast.daily[i].dt;
        const milliseconds = date * 1000; // 1575909015000
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
        dateObject.toLocaleString("en-US", { weekday: "long" }); // Monday
        dateObject.toLocaleString("en-US", { month: "long" }); // December
        dateObject.toLocaleString("en-US", { day: "numeric" }); // 9
        // dateObject.toLocaleString("en-US", { year: "numeric" }); // 2019
        // dateObject.toLocaleString("en-US", { hour: "numeric" }); // 10 AM
        //dateObject.toLocaleString("en-US", { minute: "numeric" }); // 30
        // dateObject.toLocaleString("en-US", { second: "numeric" }); // 15
        // dateObject.toLocaleString("en-US", { timeZoneName: "short" }); // 12/9/2019, 10:30:15 AM CST
        day.innerHTML = `${humanDateFormat}`;
        let min = document.querySelector(`.fmin${i}`);
        min.innerHTML = `${Math.round(forecast.daily[i].temp.min)} °c`;
        let max = document.querySelector(`.fmax${i}`);
        max.innerHTML = `${Math.round(forecast.daily[i].temp.max)} °c`;
        let weather_ic = document.querySelector(`.tin${i}`);
        let icon_data = forecast.daily[i].weather[0].icon;
        console.log(icon_data);
        weather_ic.innerHTML = `<img src ="./icons/${icon_data}.png"/>`;
    }
}

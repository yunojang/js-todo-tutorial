const weather = document.querySelector('.js-weather'),
    temperature = weather.querySelector('.js-temperature'),
    place = weather.querySelector('.js-place');

const COORDS_LS = 'coords'

function paintWeatherError(err) {
    weather.textContent = `WeatherError : ${err.message}`;
}

function paintWeather(tempData,placeData) {
    temperature.textContent = `${tempData}°C`;
    place.textContent = placeData
}

function getWeather(lat,lon) {
    try{
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.API_KEY}&units=metric`)
        .then(response => response.json())
        .then(json=> {
            const tempData = json.main.temp.toFixed(1);
            const placeData = json.name;
            
            paintWeather(tempData,placeData);
        })
    }
    catch(err) {
        paintWeatherError(err);
    }
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;

    const coordsObj = {
        latitude,longitude,
    }

    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(err) {
    weather.textContent = 'Need geolocation data'
    console.log(`Error(${err.type}) : ${err.message}`)
}   

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();

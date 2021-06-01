const weather = document.querySelector('.js-weather'),
    temperature = weather.querySelector('.js-temperature'),
    place = weather.querySelector('.js-place');

const API_KEY = '90584866d31f2f926c42719a9f8f00f4';
const COORDS_LS = 'coords'

function getWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(json=> {
        const tempData = json.main.temp.toFixed(1);
        const placeData = json.name;

        temperature.textContent = `${tempData}°C`;
        place.textContent = placeData
    })
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

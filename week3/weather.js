const COORDS = 'coords';
API_KEY = "6bdf2769f012468716917aef61137abf"

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            const temp = Math.floor(json.main.temp) + '°C';
            const humidity = json.main.humidity + "%";
            const weather = json.weather[0].main;
            const description = json.weather[0].description;
            const icon = json.weather[0].icon;
            const wind = json.wind.speed + "m/s";
            const country = json.sys.country;
            const cityname = json.name;
            const cloud = json.clouds.all + "%";
            $('.temp').append(temp);
            $('.description').append(description);
            $('.country').append(cityname + ',');
            $('.country').append(country);
            if (description == 'haze') {
                $('.cloud').append('<i class="wi wi-day-haze"></i>');
            } else if (description == 'broken clouds') {
                $('.cloud').append('<i class="wi wi-cloudy-gusts"></i>');
            } else if (description == 'rainy') {
                $('.cloud').append('<i class="wi wi-rain"></i>');
            } else if (description == 'snow') {
                $('.cloud').append('<i class="wi wi-snow"></i>');
            } else if (description == 'mist') {
                $('.cloud').append('<i class="wi wi-fog"></i>');
             } else if (description == 'clear sky') {
                $('.cloud').append('<i class="wi wi-day-sunny"></i>');
            } else {
                $('.cloud').append('<i class="wi wi-day-sunny"></i>');
            }
            $('.weather_wind').append(wind);
            $('.weather_humidity').append(humidity);
            $('.weather_cloud').append(cloud);
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(position) {
    console.log('Cant acceess geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init () {
    loadCoords();
}

init ();
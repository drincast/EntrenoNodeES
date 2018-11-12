const axios = require('axios');

const apiKeys = require('./config/keys.json');

const obtenerClimaXCoordenadas = async (latitude, longitude) => {
    let resp = await axios({
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKeys.keyOpenWeatherMap}`,
        timeout: 20000
    });

    let infoWeather = {};

    if(resp.data !== undefined && resp.data !== null){
        infoWeather.descrip = resp.data.weather[0].description;
        infoWeather.icon = resp.data.weather[0].icon;
        infoWeather.temp = resp.data.main.temp;
        infoWeather.humidity = resp.data.main.humidity;
    }
    else{
        throw ("no hay informacion del clima para el lugar");
    }

    //console.log(resp.data);

    return infoWeather;
}

module.exports = {
    obtenerClimaXCoordenadas
}
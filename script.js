let place = prompt('Enter location.');

async function getWeather(cityName){
    try{
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=fb821944aeb2aeded96b9fa63f6f9094&units=metric',{mode: 'cors'});
        response = await response.json();
        return {
            name: response.name,
            weather: response.weather[0].main,
            temp: response.main.temp,
            feelsLike: response.main.feels_like,
            tempMin: response.main.temp_min,
            tempMax: response.main.temp_max,
            humidity: response.main.humidity,
        };
    }catch(err){
        console.log(err);
    }
}

getWeather(place).then(res => {
    console.log(res);
})

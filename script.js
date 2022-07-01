const input = document.querySelector('input');
const output = document.querySelector('div');

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

function loadImage(weather){
    url = "images/" + weather + ".jpg";
    document.body.style.backgroundImage = 'url(' + url + ')';
}

function updateScreen(data){
    loadImage(data.weather);

    output.querySelector('h1').textContent = data.name;
    let paras = output.querySelectorAll('p');
    paras[0].textContent = 'Weather : ' + data.weather;
    paras[1].textContent = 'Temprature : ' + data.temp;
    paras[2].textContent = 'Feels like : ' + data.feelsLike;
    paras[3].textContent = 'Minimum Temprature : ' + data.tempMin;
    paras[4].textContent = 'Maximum Temprature : ' + data.tempMax;
    paras[5].textContent = 'Humidity : ' + data.humidity + '%';
}

input.addEventListener('change', function(e){
    getWeather(input.value).then(res => {
        updateScreen(res);
    });
})

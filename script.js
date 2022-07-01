const input = document.querySelector('input');
const main = document.querySelector('.main');
const output = document.querySelectorAll('.weather-data div');
const img = document.querySelector('.gif img');
const colors = {
    yellow: '#FAEA48',
    darkBlue: '#242F9B' ,
    lightBlue: '#34B3F1',
    grey: '#748DA6',
    lightGrey: '#DAEAF1'
}

async function getWeather(cityName){
    try{
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=fb821944aeb2aeded96b9fa63f6f9094&units=metric',{mode: 'cors'});
        response = await response.json();
        return [
            response.name,
            response.weather[0].main,
            response.main.temp,
            response.main.feels_like,
            response.main.temp_min,
            response.main.temp_max,
            response.wind.speed,
            response.main.humidity,
        ];
    }catch(err){
        console.log(err);
    }
}

async function getGif(word){
    let gif = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=J0ehOXOWVBBxadeofKf3mZLxpQbPXOJD&s=' + word, { mode: 'cors'});
    gif = await gif.json();
    img.src = gif.data.images.original.url;
}

function changeBgColor(data){
    let bgColor = '';
    if(data.includes('Clear')) bgColor = 'lightBlue';
    if(data.includes('Cloud')) bgColor = 'yellow';
    if(data.includes('Rain')) bgColor = 'darkBlue';
    if(data.includes('Mist')) bgColor = 'grey';
    if(data.includes('Snow')) bgColor = 'lightGreygrey';
    document.body.style.backgroundColor = colors[bgColor];
}

function updateScreen(data){
    getGif(data[1]);
    changeBgColor(data[1]);
    main.querySelector('h1').textContent = data[0];
    for (let i = 0; i < output.length; i++) {
        output[i].querySelector('p').textContent = data[i+1];
    }
    main.style.display = 'block';

}

input.addEventListener('change', function(e){
    getWeather(input.value).then(res => {
        updateScreen(res);
    });
})

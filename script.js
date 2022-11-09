const input = document.querySelector('input');
const left = document.querySelector('section.left');
const right = document.querySelector('section.right');
const bottom = document.querySelector('section.bottom .forecast');
const buttons = document.querySelectorAll('section.bottom button');
const days = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday'];
let interval = 'Daily';
let data;


async function getWeather(cityName){
    try{
        let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=fb821944aeb2aeded96b9fa63f6f9094&units=metric',{mode: 'cors'});
        response = await response.json();
        return response;
    }catch(err){
        console.log(err);
    }
}



function getIcon(weather, time_of_day){
    let icon = 'sunny';             //sunny, clear_night, partly_cloudy_day, partly_cloudy_night, thunderstorm, cloudy, cloudy_snowing, rainy
    if(weather.includes('clear')) {
        if(time_of_day === 'd') icon = 'sunny';
        else icon = 'clear_night'
    }else if(weather.includes('cloud')){
        if(time_of_day === 'd') icon = 'partly_cloudy_day';
        else icon = 'partly_cloudy_night'
    }else if(weather.includes('snow')) icon = 'cloudy_snowing';
    else if(weather.includes('rain')) icon = 'rainy';
    else if(weather.includes('storm')) icon = 'thunderstorm';
    return icon;
}


function updateScreen(){
    // update left section
    let d = new Date();
    const paras = left.querySelectorAll('p');
    paras[0].textContent = data.list[0].weather[0].main;
    paras[1].textContent = data.city.name;
    paras[2].textContent = d.toDateString();
    paras[3].textContent = d.getHours()%12 + ' : ' + d.getMinutes() + ' ' + (d.getHours() > 12 ? 'pm' : 'am');
    paras[4].textContent = data.list[0].main.temp + '°C';
    left.querySelector('span').textContent = getIcon(data.list[0].weather[0].main.toLowerCase(), data.list[0].sys.pod);
    input.value = '';


    // update right section
    const headings = right.querySelectorAll('h2');
    headings[0].textContent = data.list[0].main.feels_like + '°C';
    headings[1].textContent = data.list[0].main.humidity + '%';
    headings[2].textContent = data.list[0].pop + '%';
    headings[3].textContent = data.list[0].wind.speed + 'm/s';


}
function updateBottomScreen(){
    //update bottom section
    let max, increment;
    if(interval === 'Daily'){
        max = 40;
        increment = 8;
        document.querySelector('#daily').className = 'active';
        document.querySelector('#hourly').className = '';
    }else{
        max = 8;
        increment = 1;
        document.querySelector('#daily').className = '';
        document.querySelector('#hourly').className = 'active';
    }

    bottom.textContent = '';
    let x = document.querySelector("template");
    let clon ,ps,h;
    for (let i = 0; i < max; i = i+increment) {

        day = new Date(data.list[i].dt * 1000);
        clon = x.content.cloneNode(true);
        ps = clon.querySelectorAll('p');
        h =  clon.querySelector('h2');
        s = clon.querySelector('span');
        ps[0].textContent = days[day.getDay()];
        h.textContent = data.list[i].main.temp + '°C';
        if(interval === 'Daily'){
            ps[1].textContent = day.toLocaleDateString();
        }else{
            ps[1].textContent = day.getHours()%12 + ' : ' + day.getMinutes() + ' ' + (day.getHours() > 12 ? 'pm' : 'am');
        }
        s.textContent = getIcon(data.list[i].weather[0].main.toLowerCase(), data.list[i].sys.pod);
        bottom.appendChild(clon);
    }
}

input.addEventListener('change', function(e){
    getWeather(input.value).then(res => {
        data = res;
        updateScreen(res);
        updateBottomScreen(res);
    });
});

buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        interval = e.target.textContent;
        updateBottomScreen();
    });
});

// populate screen with default data
getWeather('delhi').then(res => {
    data = res;
    updateScreen();
    updateBottomScreen();
})

// async function getGif(word){
//     let gif = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=J0ehOXOWVBBxadeofKf3mZLxpQbPXOJD&s=' + word, { mode: 'cors'});
//     gif = await gif.json();
//     img.src = gif.data.images.original.url;
// }

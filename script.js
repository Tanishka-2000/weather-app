let place = prompt('Enter location.');

fetch('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=fb821944aeb2aeded96b9fa63f6f9094&units=metric',{mode: 'cors'})
.then(response => {
  return response.json();
}).then(response2 => {
  console.log('City : ' + response2.name);
  console.log('Country Code : ' + response2.sys.country);
  console.log('Temprature : ' + response2.main.temp);
  console.log('Weather : ' + response2.weather[0].main);
}).catch(err => {
  console.log(err);
});

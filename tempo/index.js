const container = document.querySelector('.container');
const searchBtn = document.querySelector('.search-box button');
const input = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const APIKey = ' CHAVE DA API ';

function searchWeather() {
    const city = input.value.trim();

    if (city === '') {
        alert('Insira uma localização.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'imagens/clear.png';
                    break;
                case 'Rain':
                    image.src = 'imagens/rain.png';
                    break;
                case 'Snow':
                    image.src = 'imagens/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'imagens/cloud.png';
                    break;
                case 'Haze':
                case 'Mist':
                case 'Fog':
                    image.src = 'imagens/mist.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        })
        .catch(() => {
            alert('Verifique sua conexão.');
        });
}

searchBtn.addEventListener('click', searchWeather);

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

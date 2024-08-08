document.addEventListener('DOMContentLoaded', () => {
    // News
    fetch
        .catch(error => console.error('No news found:', error));h('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY')
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news');
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.textContent = article.title;
                newsList.appendChild(li);
            });
        })

    // Weather
    function weather(latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_WEATHER_API_KEY&units=metric`)
            .then(response => response.json())
            .then(data => {
                const weatherInfo = document.getElementById('weather');
                weatherInfo.innerHTML = `
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                `;
            })
            .catch(error => console.error('No weather found:', error));
    }

    // Location
    function location() {
        fetch('https://ipinfo.io/json?token=YOUR_IPINFO_API_KEY')
            .then(response => response.json())
            .then(data => {
                document.getElementById('location').innerHTML = `
                    <p><strong>City:</strong> ${data.city}</p>
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Country:</strong> ${data.country}</p>
                `;
                const [latitude, longitude] = data.loc.split(',');
                weather(latitude, longitude);
            })
            .catch(error => console.error('No location found:', error));
    }

    location();
});
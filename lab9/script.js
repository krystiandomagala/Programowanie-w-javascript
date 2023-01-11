let weather = {
    "apiKey": "bd952cc93ba6924ac9271e78b19f8ffd",
    fetchWeather: function (city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name, visibility, dt, timezone } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min, temp_max, feels_like, humidity, pressure } = data.main;
        const { sunrise, sunset } = data.sys;
        const { speed } = data.wind;

        console.log(data);

        const currCityName = document.querySelector("#current-city-name");
        currCityName.innerText = name;

        const currCityTime = document.querySelector("#current-city-time");
        currCityTime.innerText = new Date((dt + timezone - 3600) * 1000).toLocaleTimeString('en-US', {hour: 'numeric',hour12: true, minute:'numeric'});

        const currIcon = document.querySelector("#current-icon");
        currIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        const currTemp = document.querySelector("#current-temperature");
        currTemp.innerText = Math.round(temp) + "°C";

        const currDesc = document.querySelector("#current-desc");
        currDesc.innerText = description;

        const sunriseTime = new Date((sunrise+timezone - 3600)*1000).toLocaleTimeString('en-US', {hour: 'numeric', hour12: true, minute:'numeric', });
        const sunsetTime = new Date((sunset+timezone - 3600)*1000).toLocaleTimeString('en-US', {hour: 'numeric',hour12: true, minute:'numeric'});


        const cards = document.querySelectorAll(".card-text");
        cards[0].innerText = " " + Math.round(temp_min) + "°C";
        cards[1].innerText = " " + Math.round(temp_max) + "°C";
        cards[2].innerText = " " + Math.round(feels_like) + "°C";
        cards[3].innerText = " " + Math.round(pressure) + " hPa";
        cards[4].innerText = " " + Math.round(humidity) + "%";
        cards[5].innerText = " " + speed + " m/s";
        cards[6].innerText = " " + sunriseTime;
        cards[7].innerText = " " + sunsetTime;
        cards[8].innerText = " " + visibility + " m";
    },
    add: function() {
        this.fetchWeather(document.querySelector("#city").value);
    },
    load: function(city) {
        this.fetchWeather(city);
    }
}

window.addEventListener("load", function(){
    if(localStorage.getItem("city") === null)
        this.localStorage.setItem("city", "Kraków")

    weather.load(localStorage.getItem("city"));
});

const newLocationBtn = document.querySelector("#newLocationBtn");

newLocationBtn.addEventListener("click", function(){
    weather.add();
    
    document.querySelector(".location-list").innerHTML = `<div class="place-card bg-secondary text-white mb-3">
        <div class="card-left">
            <h3>${name}</h3>
            <h6>${new Date((dt + timezone - 3600) * 1000).toLocaleTimeString('en-US', {hour: 'numeric',hour12: true, minute:'numeric'})}</h6>
        </div>
        <div>
            <h3>${temp}°C</h3>
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">
        </div>
    </div>`

    document.querySelector("#city").value = "";
});

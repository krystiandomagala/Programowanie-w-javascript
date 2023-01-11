let weather = {
    "apiKey": "46d3d0d1bf5ba913964608c3b2f9b509",
    fetchWeather: function (city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        dataObj = data;
        const { name, visibility, dt, timezone } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_min, temp_max, feels_like, humidity, pressure } = data.main;
        const { sunrise, sunset } = data.sys;
        const { speed } = data.wind;

        console.log(data);

        const locationListCityName = document.querySelector(".place-card-city");
        const locationListTime = document.querySelector(".place-card-time");
        const locationListTemp = document.querySelector(".place-card-temp");
        const locationListIcon = document.querySelector(".place-card-icon");


        const currCityName = document.querySelector("#current-city-name");
        locationListCityName.innerText = currCityName.innerText = name;

        const currCityTime = document.querySelector("#current-city-time");
        locationListTime.innerText = currCityTime.innerText = new Date((dt + timezone - 3600) * 1000).toLocaleTimeString('en-US', {hour: 'numeric',hour12: true, minute:'numeric'});

        const currIcon = document.querySelector("#current-icon");
        locationListIcon.src = currIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        const currTemp = document.querySelector("#current-temperature");
        locationListTemp.innerText = currTemp.innerText = Math.round(temp) + "°C";

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
    add: async function(counter,city) {
        console.log(city);
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
        )
        .then((response) => response.json())
        .then((data) => dataObj = data);

        document.querySelector(".location-list").innerHTML += `                
        <div class="place-card bg-secondary text-white mb-3">
            <div class="card-left">
                <h3 class="place-card-city">${dataObj.name}</h3>
                <h6 class="place-card-time">${new Date((dataObj.dt + dataObj.timezone - 3600) * 1000).toLocaleTimeString('en-US', {hour: 'numeric',hour12: true, minute:'numeric'})}</h6>
            </div>
            <div>
                <h3 class="place-card-temp">${Math.round(dataObj.main.temp) + "°C"}</h3>
                <img  class="place-card-icon" src="http://openweathermap.org/img/wn/${dataObj.weather[0].icon}@2x.png" alt="">
            </div>
        </div>`;

        localStorage.setItem(city, city);

    },

    load: function(city) {
        this.fetchWeather(city);
    }
}

window.addEventListener("load", function(){
    if(localStorage.getItem("Kraków") === null)
        this.localStorage.setItem("Kraków", "Kraków")

    weather.load(localStorage.getItem("Kraków"));
});

let counter = 1;
const newLocationBtn = document.querySelector("#newLocationBtn");
newLocationBtn.addEventListener("click", createLocation);
function createLocation(){
    console.log(document.querySelector("#city").value)
    console.log(localStorage.getItem(document.querySelector("#city").value));
    if(document.querySelector("#city").value != "" && localStorage.getItem(document.querySelector("#city").value) == null)
        if(counter++<10)
            weather.add(counter,document.querySelector("#city").value);

    document.querySelector("#city").value = "";
}


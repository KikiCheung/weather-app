//daytimedisplay
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()]; //between 0 and 6
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//currentweatherdisplay
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#day-time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#current-weather-img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

//forecastweatherdisplay
function showForecastWeather(response) {
  let forecastImgElement = document.querySelector("#forecast-weather-img-col");
  forecastImgElement.innerHTML = null;
  //let forecastImg = null;

  for (let index = 0; index < 5; index++) {
    forecastImg = response.data.list[index];
    forecastImgElement.innerHTML += `
        <ul class="forecast-weather-img-border">
          <li><img src="http://openweathermap.org/img/wn/${forecastImg.weather[0].icon}@2x.png" alt=" " class="forecast-weather-img"></li>
        </ul>
        `;
  }

  let forecastElement = document.querySelector("#forecast-weather-col");
  forecastElement.innerHTML = null;
  //let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `   
        <ul class="forecast-temp">
          <li>${formatHours(forecast.dt * 1000)}<br />${Math.round(
      forecast.main.temp
    )}°</li></ul>
      `;
  }
}

//searchcity
function searchCity(city) {
  let apiEnd = "&units=metric&appid=6d311b54424188b229639bfec29ddda2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}${apiEnd}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}${apiEnd}`;
  axios.get(apiUrl).then(showForecastWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", handleSubmit);

//currentlocation
function retrievePosition(position) {
  let apiEnd = "&units=metric&appid=6d311b54424188b229639bfec29ddda2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}${apiEnd}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}${apiEnd}`;
  axios.get(apiUrl).then(showForecastWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationbutton = document.querySelector("#current-location-button");
currentLocationbutton.addEventListener("click", getCurrentLocation);

//tempconversion
function convertFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
  let temperatureElement = document.querySelector("#temp");
  let fTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemperature);
}

function convertCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fTemp");
fahrenheitLink.addEventListener("click", convertFahrenheitTemp);

let celsiusLink = document.querySelector("#cTemp");
celsiusLink.addEventListener("click", convertCelsiusTemp);

let celsiusTemperature = null;

//setdafaultcity
searchCity("New York");

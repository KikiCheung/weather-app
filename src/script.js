//daytimedisplay
function formattedDate() {
  let now = new Date();
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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let showDayTime = document.querySelector("#day-time");
showDayTime.innerHTML = formattedDate();

//weatherdisplay
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

//searchcity
function searchCity(city) {
  let apiStart = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiEnd = "&units=metric&appid=6d311b54424188b229639bfec29ddda2";
  let apiUrl = `${apiStart}${city}${apiEnd}`;
  axios.get(apiUrl).then(showWeather);
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
  let apiStart = "https://api.openweathermap.org/data/2.5/weather?";
  let apiEnd = "&units=metric&appid=6d311b54424188b229639bfec29ddda2";
  let apiUrl = `${apiStart}lat=${position.coords.latitude}&lon=${position.coords.longitude}${apiEnd}`;
  axios.get(apiUrl).then(showWeather);
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
  let ctemperature = document.querySelector("#temp");
  let temperature = ctemperature.innerHTML;
  ctemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertCelsiusTemp(event) {
  event.preventDefault();
  let ftemperature = document.querySelector("#temp");
  let temperature = ftemperature.innerHTML;
  ftemperature.innerHTML = Math.round((temperature - 32) / 1.8);
}

let fahrenheitTemp = document.querySelector("#fTemp");
fahrenheitTemp.addEventListener("click", convertFahrenheitTemp);

let celsiusTemp = document.querySelector("#cTemp");
celsiusTemp.addEventListener("click", convertCelsiusTemp);

//defaultcity
searchCity("New York");

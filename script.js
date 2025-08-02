async function getWeather() {
  
  

  try {
    const response = await fetch(`/.netlify/functions/weather?city=${city}`);
    if (!response.ok) {
      throw new Error(`City not found (${response.status})`);
    }
    const data = await response.json();
    console.log(data); // Debugging

    document.getElementById("city-name").innerText = data.name;
    document.getElementById(
      "temperature"
    ).innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").innerText =
      data.weather[0].description;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById("weather-info").classList.remove("hidden");

    changeBackground(data.weather[0].main);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

function changeBackground(weather) {
  const body = document.body;
  switch (weather.toLowerCase()) {
    case "clear":
      body.style.background = "linear-gradient(to right, #ffdd44, #ff8800)"; // Sunny
      break;
    case "clouds":
      body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)"; // Cloudy
      break;
    case "rain":
    case "drizzle":
      body.style.background = "linear-gradient(to right, #4b79a1, #283e51)"; // Rainy
      break;
    case "thunderstorm":
      body.style.background =
        "linear-gradient(to right, #0f2027, #203a43, #2c5364)"; // Thunderstorm
      break;
    case "snow":
      body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)"; // Snowy
      break;
    default:
      body.style.background = "linear-gradient(to right, #74ebd5, #acb6e5)"; // Default
  }
}

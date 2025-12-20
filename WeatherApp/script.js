const API_KEY = "0b28f2769563eafe7f73ba92b690d39a"

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");
const weatherResult = document.getElementById("weatherResult");

console.log(cityInput, searchBtn, loader, weatherResult);

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if(city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    loader.style.display = "block";
    weatherResult.innerHTML = "";

    try {
        const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherResult.innerHTML = `
        <h2> ${data.name}</h2>
        <p> 🌡️ Temperature: ${data.main.temp} °C </p>
        <p> 🌥️ Condition: ${data.weather[0].main}</p> 
        `;
    }catch(error) {
        weatherResult.innerHTML = `
        <p style="color:red;"> ${error.message} </p>
        `;     
    } 

    loader.style.display = "none"
}
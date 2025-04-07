   // alert("If the location is not your loction due to location is of your laptop address");

   const apiKey = "9e6a15cda1f94d2f9f294103251103"; // Your API key
  
let baseUrl = "https://api.weatherapi.com/v1/current.json";
let sunUrl = "https://api.weatherapi.com/v1/astronomy.json";

   
   let locationInput = document.getElementById("location");
   const searchButton = document.getElementById("btn");
   const locationDisplay = document.getElementById("location1");
   const feelsLike = document.getElementById("feels-like");
   const sunrise = document.getElementById("sunrise"); // Placeholder
   const sunset = document.getElementById("sunset"); // Placeholder
   const highLow = document.getElementById("high-low"); // Not directly available
   const wind = document.getElementById("wind");
   const humidity = document.getElementById("humidity");
   const dewPoint = document.getElementById("dew-point"); // Placeholder
   const pressure = document.getElementById("pressure");
   const uvIndex = document.getElementById("uv-index");
   const visibility = document.getElementById("visibility");
   const moonPhase = document.getElementById("moon"); // Placeholder
   
   // Function to fetch weather data
       async function fetchWeather(location) {
           const url = `${baseUrl}?key=${apiKey}&q=${location}&aqi=yes`;
           let astronomyUrl = await fetch(`${sunUrl}?key=${apiKey}&q=${location}&aqi=yes`);
           let sunData = await astronomyUrl.json();
           console.log(sunData);
           fetch(url)
               .then((response) => response.json())
               .then((data) => {
                   console.log(data);
   
                   // Update weather details
                   locationDisplay.textContent = `${data.location.name},  ${data.location.country}`;
                   feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
                   wind.textContent = `${data.current.wind_kph} km/h`;
                   humidity.textContent = `${data.current.humidity}%`;
                   dewPoint.textContent = `${data.current.dewpoint_c}`;
                   pressure.textContent = `${data.current.pressure_mb} mb`;
                   visibility.textContent = `${data.current.vis_km} km`;
                   uvIndex.textContent = data.current.uv;
   
                   // values for non-available data
                   sunrise.textContent = `${sunData.astronomy.astro.sunrise}`;
                   sunset.textContent = `${sunData.astronomy.astro.sunset}`;
   
                   moonPhase.textContent = `${sunData.astronomy.astro.moon_phase}`;
   
               })
               .catch((error) => console.error("Error fetching weather data:", error));
       };
   
   // Fetch weather for the current location
   // const getCurrentLocationWeather = () => {
   //   if (navigator.geolocation) {
   //     navigator.geolocation.getCurrentPosition(
   //       (position) => {
   //         const latitude = position.coords.latitude;
   //         const longitude = position.coords.longitude;
   //         const currentLocation = `${latitude},${longitude}`;
   //         fetchWeather(currentLocation); // Fetch weather for current location
           
   //       },
   //       (error) => {
   //         console.error("Error getting geolocation:", error);
   //         alert("Unable to retrieve your location.");
   //       }
         
   //     );
       
   //   } else {
   //     alert("Geolocation is not supported by your browser try with another browser.");
   //   }
   // };
   
//    fetchWeather("delhi,india")
   
   // Event listener for the search button
//    searchButton.addEventListener("click", () => {
//      const location = locationInput.value.trim();
//      if (location) {
//        fetchWeather(location); // Fetch weather for searched location
//      } else {
//        alert("Please enter a location.");
//      }
//    });
   
   // Load current location weather on page load
   // window.onload = getCurrentLocationWeather;
   
   
   
   
   
   // hourly data js;
   const weatherCodeDescriptions = {
           0: { day: ["./img/2682848_day_forecast_sun_sunny_weather_icon.png", "sunny"], night: ["./img/5729385_moon_night_weather_climate_crescent_icon.png", "clear"] },
           1: { day:["./img/03-s.png","Mostly sunny"], night:["./img/35-s.png","Mostly clear"]},
           2: { day: ["./img/4102326_cloud_sun_sunny_weather_icon.png", "Partly Cloudy"], night: ["./img/5729393_cloudy_moon_night_cloud_weather_icon.png", "Partly Cloudy"] },
           3: { day: ["./img/4102315_cloud_weather_icon.png", "Mostly Cloudy"], night: ["./img/5729384_forecast_moon_night_raining_weather_icon.png", "Mostly Cloudy"] },
           60: { day: ["./img/4102320_cloud_heavy rain_rain_weather_icon.png", "Rain"], night: ["./img/3859135_climate_cloud_forecast_heavy_rain_icon.png", "Rain"] },
           40:["./img/snowing_3628484.png","Snowing"],
           50:["./img/drizzle_7865992.png","Drizzle"],
       };
   
   
       async function fetchWeatherData(locationInput) {
           try {
               const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationInput)}&format=json&limit=1`;
   
               const urlfetch=await fetch(apiUrl)
               const apidata= await urlfetch.json()
               console.log(apidata);
               const LAT=apidata[0].lat;
               const LON=apidata[0].lon;
               
   
               const BASE_URL = "https://api.open-meteo.com/v1/forecast";
               const response = await fetch(
                   `${BASE_URL}?latitude=${LAT}&longitude=${LON}&hourly=temperature_2m,weather_code&timezone=auto`
               );
               console.log(LAT,LON);
               
               const data = await response.json();
               console.log(data);
   
   
               // Format current time
               const currentDate = new Date();
               const year = currentDate.getFullYear();
               const month = String(currentDate.getMonth() + 1).padStart(2, '0');
               const day = String(currentDate.getDate()).padStart(2, '0');
               const hours = String(currentDate.getHours()).padStart(2, '0');
               const currentHourISO = `${year}-${month}-${day}T${hours}:00`;
   
               // Get hourly data
               const hourlyTimes = data.hourly.time;
               const hourlyTemps = data.hourly.temperature_2m;
               const hourlyContainer = document.querySelector(".hourly-data");
               hourlyContainer.innerHTML = ""; // Clear existing rows
               locationName.textContent=''
               locationName.textContent=apidata[0].display_name;
               console.log(locationName.textContent);
               
   
               
   
               // Find the index of the current hour
               let currentHourIndex = hourlyTimes.indexOf(currentHourISO);
   
               if (currentHourIndex === -1) {
                   console.error("Current hour not found in weather data.");
                   return;
               }
   
               // Generate rows for the next 5 hours
               const endHourIndex = Math.min(currentHourIndex + 4, hourlyTimes.length - 1);
   
               for (let i = currentHourIndex; i <= endHourIndex; i++) {
                   const parsedTime = new Date(hourlyTimes[i]);
                   console.log(parsedTime);
   
                   const hour = String(parsedTime.getHours()).padStart(2, '0');
                   console.log(hour);
                   console.log(String(parsedTime.toString().split(" ",3)));
                   
                   const formattedHour = `${hour}:00`;
   
                   const temp = hourlyTemps[i];
                   let condition = data.hourly.weather_code[i]
   
                   let imgSrc = ''
                   let weathername = ''
                   if(condition>=60){
                       if(hour >= 6 && hour <= 18){
                           imgSrc = weatherCodeDescriptions[60].day[0];
                           weathername = weatherCodeDescriptions[60].day[1]
                       }else{
                           imgSrc = weatherCodeDescriptions[60].night[0];
                           weathername = weatherCodeDescriptions[60].night[1]
                       }
                   }else if(condition>=50){
                       imgSrc = weatherCodeDescriptions[50][0];
                       weathername = weatherCodeDescriptions[50][1]
                   }else if(condition>=40){
                       imgSrc = weatherCodeDescriptions[40][0];
                       weathername = weatherCodeDescriptions[40][1]
                   }else if (hour >= 6 && hour <= 18) {
                       imgSrc = weatherCodeDescriptions[condition].day[0];
                       weathername = weatherCodeDescriptions[condition].day[1]
                   } else{
                       imgSrc = weatherCodeDescriptions[condition].night[0];
                       weathername = weatherCodeDescriptions[condition].night[1]
                   }
   
   
                   
                   const hourRow = document.createElement("div");
                   hourRow.classList.add("hour-row");
   
                   // if()
                   hourRow.innerHTML = `
                       <div class="hour"><span class="span-inside">${String(parsedTime.toString().split(" ",3))}</span><br>${formattedHour}</div>
                       <div class="temperature">${temp}°C</div>
                       <div class="condition"><img src="${imgSrc}" alt="Weather condition">${weathername}</div>
                       `;
   
                   hourlyContainer.appendChild(hourRow);
               }
               // if(flag){
               //     let hourbtn = document.createElement("button");
               //     hourbtn.textContent = "Next 12 Hours";
               //     hourbtn.classList.add("hourly-btn");
               //     hourlyContainer.after(hourbtn)
               // }
               
               
               // flag=false;//for next 12 hour btn not should created many time;
               
   
           } catch (error) {
               locationName.textContent=`${locationInput} in not valid`
               console.error("Error fetching weather data:", error);
               document.querySelector(".hourly-data").innerHTML =
                   "<div>Failed to fetch weather data.</div>";
           }
       }
   
       let locationName=document.getElementById("location-name")
   
    //    let =document.getElementById("location").value
   
       // let flag=true;
       fetchWeather("delhi,india");//today weather;
       fetchWeatherData("Delhi");//hourly data;
       
       document.getElementById("btn").addEventListener("click",()=>{
        locationInput=document.getElementById("location").value
            fetchWeather(locationInput);
           fetchWeatherData(locationInput);
       })




       // Map Script 
       let radarMap = document.getElementById('radar-map');

       // Function to update the radar map
       async function fun(place) {
         try {
           const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`;
       
           const urlfetch = await fetch(apiUrl);
           const apidata = await urlfetch.json();
       
           if (apidata.length === 0) {
             alert('Location not found. Please enter a valid location.');
             return;
           }
       
           const LAT = apidata[0].lat;
           const LON = apidata[0].lon;
       
           // Update the radar map iframe source
           radarMap.src = `https://embed.windy.com/embed2.html?lat=${LAT}&lon=${LON}&zoom=5&level=surface&overlay=rain&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=&detailLon=&metricWind=default&metricTemp=default&radarRange=-1`;
         } catch (error) {
           console.error('Error fetching location data:', error);
           alert('Error fetching location data. Please try again.');
         }
       }
       
       // Set a default location
       fun("New Delhi");
       
       // Event listener for the search button
       document.getElementById("btn").addEventListener("click", () => {
         let place = document.getElementById("location").value.trim();
         if (place) {
           fun(place);
         } else {
           alert('Please enter a location.');
         }
       });
       

let details = document.querySelector(".details");
let form = document.querySelector("form");
let input = document.getElementById("city");
let historyArea = document.getElementById("history");

let historyCities = JSON.parse(localStorage.getItem("history")) || [];


/* -----------------------
SHOW SEARCH HISTORY
-----------------------*/

function showHistory(){

historyArea.innerHTML="";

historyCities.forEach(city=>{

let p=document.createElement("p");

p.textContent=city;

p.addEventListener("click",()=>{

details.innerHTML="Loading...";
getWeather(city);

});

historyArea.appendChild(p);

});

}

showHistory();


/* -----------------------
GET CITY COORDINATES
-----------------------*/

async function getCity(cityName){

let encodedCity = encodeURIComponent(cityName);

let res = await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${encodedCity}&count=1`
);

let data = await res.json();

if(!data.results || data.results.length === 0){
throw "City not found";
}

/* choose best result */
return data.results[0];

}


/* -----------------------
GET WEATHER DATA
-----------------------*/

async function getWeather(cityName="Delhi"){

try{

let city = await getCity(cityName);

let url =
`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;

let res = await fetch(url);

let data = await res.json();

let temp = data.current_weather.temperature;
let wind = data.current_weather.windspeed;

let humidity =
Math.round(
data.hourly.relative_humidity_2m.reduce((a,b)=>a+b)/data.hourly.relative_humidity_2m.length
);

details.innerHTML = `

<div class="info-strip">
<p>City</p>
<p>${city.name}</p>
</div>

<div class="info-strip">
<p>Temperature</p>
<p>${temp} °C</p>
</div>

<div class="info-strip">
<p>Humidity</p>
<p>${humidity} %</p>
</div>

<div class="info-strip">
<p>Wind Speed</p>
<p>${wind} km/h</p>
</div>

`;
    
if(!historyCities.includes(city.name)){

historyCities.push(city.name);

localStorage.setItem(
"history",
JSON.stringify(historyCities)
);

showHistory();

}

}

catch{

details.innerHTML =
"<h2 style='text-align:center'>City Not Found</h2>";

}

}


/* -----------------------
FORM SEARCH
-----------------------*/

form.addEventListener("submit",(e)=>{

e.preventDefault();

let city=input.value.trim();

if(!city) return;

details.innerHTML="Loading...";

getWeather(city);

input.value="";

});


/* -----------------------
DEFAULT CITY
-----------------------*/

getWeather("Delhi");
// we need the get the all importen element form the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const realFeel = document.querySelector('.realfeel');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const form = document.getElementById("locationInput");
const cloudOutPut = document.getElementById("cloud");
const humidityOutPut = document.getElementById("humidity");
const icon = document.getElementById("icons");
const windOutPut = document.getElementById("wind");
const pressure = document.getElementById("pressure");

// default city when the page loads 
let cityInput = "chandigarh";

// add the click event to each city in the search panel 
cities.forEach((city) => {
    city.addEventListener('click', (e) => {

        //changing from the defaul fom the cilcked one 
        cityInput = e.target.innerHTML;
        // function that fetches the data and display the data of weather api
        fetchWeatherData();
        app.style.opacity = "0";
    })
});


// now this line of code will be used to submit the form using the submit evenlistener in search bar

form.addEventListener('submit', (e) => {
    // if search bar is empty it throw an error  
    if (search.value.length === 0) {
        alert('please enter the city name');
    } else {
        cityInput = search.value;
        // console.log(cityInput);
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    // preventing the befault befaviour of the form
    e.preventDefault();
});


// this line of code gives the data of the one day 
function dayOfTheWeek(day, month, year) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

// we have to add the api and key to this function to fetch the data of the weather api
function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=3a1b7bd4553a483cb6a190736231402&q=${cityInput}`)

        // converting the json formate to the normal js formate of the API object   data
        .then(response => response.json())
        .then(  query => {

            // here we console log the data to see what is available
            console.log(query);

            // adding the temperatur and weather conditon to the page
            temp.innerHTML = Math.floor(query.current.temp_c)+ "°C";
            realFeel.innerHTML = Math.floor(query.current.feelslike_c)+ "°C";
            conditionOutput.innerHTML = query.current.condition.text;
            pressure.innerHTML = query.current.pressure_mb + " hPa";

            // get the date and time form the city and exteract the day month and year into individual variable
            const date = query.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr( 5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date. substr(11);

            // set the data into this formate 2021-10-02 12:39 to 17:21 - friday 9,10,2021
            dateOutput.innerHTML = `${dayOfTheWeek(y, m, d)} ${d}/ ${m}/ ${y}`;
            timeOutput.innerHTML = time;

            // add the name of the city into the page
            nameOutput.innerHTML = query.location.name;
            // geting the crosponding icon url for the weather and extract a part of it 
            const iconId = query.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            // bindig the icon url according to the api data
            icon.src = "./icons/" + iconId;

            // add the weather details to the page 
                cloudOutPut.innerHTML = query.current.cloud + "%";
                humidityOutPut.innerHTML = query.current.humidity + "%";
                windOutPut.innerHTML = query.current.wind_kph + "km/h";

            // set the default time of day
            let timeOfDay = "day";

            // get the unique id for each weather condition
            const code = query.current.condition.code;
            
            // change to night if its night in the city
            if (!query.current.is_day) {
                timeOfDay = "night";
            }

            //  sunny or clear
            if (code == 1000) {


                // random selection for the animation video
                var randomNo1 = Math.floor(Math.random()*7);
                // console.log(randomNo1);
                app.style.backgroundImage = `url(./image/clear/`+ timeOfDay +`/clear`+ randomNo1 +`.mp4)`;

                // change the button background color depend upon forecast
                btn.style.background = "#e5ba92";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            // heavy cloudy 
            else if (code == 1006 || code == 1009) {

                // random selection for the animated video
                var randomNo2 = Math.floor(Math.random()*6);
                app.style.backgroundImage = `url(./image/cloudy/heavycloudy/`+ timeOfDay +`/heavycloudy`+ randomNo2 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#fa6d1b";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }
            // mild cloudy  
            else if (code == 1003) {

                // random selection for the animated vide
                var randomNo3 = Math.floor(Math.random()*5);
                app.style.backgroundImage = `url(./image/cloudy/mildcloudy/`+ timeOfDay +`/mildcloudy`+ randomNo3 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#fa6d1b";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            // heavy thunder
            else if(code == 1087 || code == 1153 || code == 1282){

                // random selection for the animated vide
                var randomNo4 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/thunder/heavythunder/heavythunder`+ randomNo4 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            // mild thunder
            else if(code == 1150 || code == 1273 || code == 1276 || code == 1279){

                // random selection for the animated vide
                var randomNo5 = Math.floor(Math.random()*6);
                app.style.backgroundImage = `url(./image/thunder/mildthunder/mildthunder`+ randomNo5 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // heavy rain 
            else if (code == 1192 || code == 1195 || code == 1201 || code == 1246) {
                // random selection for the animated vide
                var randomNo6 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/rain/heavyrain/`+ timeOfDay +`/heavyrain`+ randomNo6 +`.mp4)`;
                
                // changing the button color to depend upon forecast
                btn.style.background = "#647d75";

                if (timeOfDay == "night") {
                    btn.style.background = "#325c80"
                }
            }
            // mild rain
            else if (code == 1180 || code == 1186 || code == 1189 || code == 1198 || code == 1240 || code == 1243 || code == 1063) {

                // random selection for the animated vide
                var randomNo7 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/rain/mildrain/`+ timeOfDay +`/mildrain`+ randomNo7 +`.mp4)`;
                
                // changing the button color to depend upon forecast
                btn.style.background = "#647d75";

                if (timeOfDay == "night") {
                    btn.style.background = "#325c80"
                }
            }

            // heavy snow
            else if(code == 1117 || code == 1219 || code == 1222 || code == 1225 || code == 1261 || code == 1264 || code == 1258){

                // random selection for the animated vide
                var randomNo8 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/snow/heavysnow/`+ timeOfDay +`/heavysnow`+ randomNo8 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            // mild snow
            else if(code == 1114 || code == 1210 || code == 1213 || code == 1216 || code == 1255 || code == 1066){

                // random selection for the animated vide
                var randomNo9 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/snow/mildsnow/`+ timeOfDay +`/mildsnow`+ randomNo9 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // heavy fog
            else if(code == 1135 || code == 1147 || code == 1171){

                // random selection for the animated vide
                var randomNo10 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/fog/heavyfog/`+ timeOfDay +`/heavyfog`+ randomNo10 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            // mild fog
            else if(code == 1168){

                // random selection for the animated vide
                var randomNo11 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/snow/mildfog/`+ timeOfDay +`/mildfog`+ randomNo11 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // heavy sleet
            else if(code == 1072 || code == 1252){

                // random selection for the animated vide
                var randomNo12 = Math.floor(Math.random()*1);
                app.style.backgroundImage = `url(./image/sleet/heavysleet/`+ timeOfDay +`/heavysleet`+ randomNo12 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }
            // mild sleet
            else if(code == 1069 || code == 1204 || code == 1207 || code == 1249){

                // random selection for the animated vide
                var randomNo13 = Math.floor(Math.random()*1);
                app.style.backgroundImage = `url(./image/sleet/mildsleet/`+ timeOfDay +`/mildsleet`+ randomNo13 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // mist
            else if(code == 1030){

                // random selection for the animated vide
                var randomNo14 = Math.floor(Math.random()*7);
                app.style.backgroundImage = `url(./image/mist/`+ timeOfDay +`/mist`+ randomNo14 +`.mp4)`;

                // changing the button color to depend upon forecast
                btn.style.background = "#4d72aa";

                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // fade in the page once all is done
            app.style.opacity = "1";
        })

        // 
        .catch(() => {
            alert("city not found, please try agian ;)");
            app.style.opacity = "1";
        });
}
fetchWeatherData();
app.style.opacity = "1";
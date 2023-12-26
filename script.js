let curLocation = [];
let weatherConditions = [
    '<i class="fa-solid fa-sun"></i>',
    '<i class="fa-solid fa-cloud-sun"></i>',
    '<i class="fa-solid fa-smog"></i>',
    '<i class="fa-solid fa-cloud-rain"></i>',
    '<i class="fa-regular fa-snowflake"></i>',
    '<i class="fa-solid fa-cloud-bolt"></i>'
]
setInterval(getLocation, 10000);

if (getCookie("lat") != null && getCookie("lon") != null) {
    GetCurrent(getCookie("lat"), getCookie("lon"));
}

function GetCurrent(latitude, longitude) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let cur = JSON.parse(this.responseText);
            console.log("refreshed");
            document.getElementById("curTemp").innerHTML = cur["current"]["temperature_2m"] + "°C";
            document.getElementById("curRain").innerHTML = cur["current"]["rain"] + "mm";
            let weatherCond = document.getElementById("curWeatherCond");
            switch (cur["current"]["weather_code"]) {
                case 0:
                    weatherCond.innerHTML = weatherConditions[0];
                    break;
                case 1,2,3:
                    weatherCond.innerHTML = weatherConditions[1];
                    break;
                case 45,48,51,53,55,56,57:
                    weatherCond.innerHTML = weatherConditions[2];
                    break;
                case 61,63,65,66,67,80,81,82:
                    weatherCond.innerHTML = weatherConditions[3];
                    break;
                case 71,73,75,77,85,86:
                    weatherCond.innerHTML = weatherConditions[4];
                    break;
                case 95,96,99:
                    weatherCond.innerHTML = weatherConditions[5];
                    break;
            }
        }
    };
    xmlhttp.open("GET", "https://api.open-meteo.com/v1/forecast?current=temperature_2m,rain,weather_code&latitude=" + latitude + "&longitude=" + longitude, true);
    xmlhttp.send();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    curLocation[0] = position.coords.latitude;
    curLocation[1] = position.coords.longitude;
    document.cookie = "lat=" + curLocation[0] + ";";
    document.cookie = "lon=" + curLocation[1] + ";";

    GetCurrent(curLocation[0], curLocation[1]);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

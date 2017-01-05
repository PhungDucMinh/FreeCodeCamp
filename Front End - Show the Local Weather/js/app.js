
var key = "1f097b04ee542c4f047685200f45efd2";
var responeFormat = "json";
var api = "http://api.openweathermap.org/data/2.5/weather?q=";
var unit = "metric";
var iconPartialURL = "http://openweathermap.org/img/w/";
var result = "";


var weatherTemplate = "<p class='city'>{{city}}</p><p class='temperature'>{{temperature}} <span class='temperature-unit'>{{temperatureUnit}}</span></p><p class='weather-icon'><img class='img-responesive' src='{{iconURL}}' alt='Weather Icon'></p>";

$(document).ready(function () {
    updateView();
});

function updateView() {
    $.getJSON("http://ipinfo.io", function (respone) {
        console.log(respone);
        var ipAddress = respone;
        var cityName = ipAddress["city"];
        var countryName = ipAddress["country"];
        var fullURL = api + cityName + "," + countryName + "&appid=" + key + "&format=" + responeFormat + "&units=" + unit;
        $.getJSON(fullURL, function (respone) {
            console.log(respone);
            var weather = respone;
            var city = weather["name"];
            var temperature = weather["main"]["temp"];
            var status = weather["weather"][0]["main"];
            var iconURL = iconPartialURL + weather["weather"][0]["icon"] + ".png";
            var temperatureUnit = "";
            if (unit === "metric") {
                temperatureUnit = "C";
            } else if (unit === "imperial") {
                temperatureUnit = "F";
            }
            var displayObj = {
                "city": city,
                "temperature": temperature,
                "status": status,
                "iconURL": iconURL,
                "temperatureUnit": temperatureUnit,
            };
            console.log(displayObj);
            var rendered = Mustache.render(weatherTemplate, displayObj);
            $(".content .weather-status").html(rendered);
        });
    });
};
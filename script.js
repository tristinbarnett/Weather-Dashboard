var city;
var cardBody = $(".card-body");
var searchHistory = [];

function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    console.log(storedCities);
    if (storedCities !== null) {
        searchHistory = storedCities;
    };

    for (i = 0; i < searchHistory.length; i++) {
        cityButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityButton.text(searchHistory[i]);
        $(".list-group").append(cityButton);
    }
};
getItems();

function getData() {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ae2d75d12546b3e67c1a101fdff49bc`
    cardBody.empty();
    $("#weeklyForecast").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var date = moment().format("(MM/DD/YYYY)");
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var name = $("<h3>").html(city + date);
        cardBody.prepend(name);
        cardBody.append($("<img>").attr("src", iconURL));

    

        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        cardBody.append($("<p>").html("Temperature: " + temp + " &#176;F"));
        var humidity = response.main.humidity;
        cardBody.append($("<p>").html("Humidity: " + humidity + "&#37;"));
        var windSpeed = response.wind.speed;
        cardBody.append($("<p>").html("Wind Speed: " + windSpeed + " MPH"));

        var lat = response.coord.lat;
        var lon = response.coord.lon;

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=6ae2d75d12546b3e67c1a101fdff49bc&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }).then(function (response) {
            cardBody.append($("<p>").html("UV Index: <span>" + response.value + "</span>"));
            if (response.value <= 2) {
                $("span").attr("class", "green");
            };
            if (response.value > 2 && response.value <= 5) {
                $("span").attr("class", "yellow");
            };
            if (response.value > 5 && response.value <= 7) {
                $("span").attr("class", "orange");
            };
            if (response.value > 7 && response.value <= 10) {
                $("span").attr("class", "red");
            };
            if (response.value > 10) {
                $("span").attr("class", "purple");
            };
        })
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6ae2d75d12546b3e67c1a101fdff49bc",
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (i = 0; i < 5; i++) {

                var newColumn = $("<div>").attr("class", "col fiveDay bg-primary text-white");
                $("#weeklyForecast").append(newColumn);

                var myDate = new Date(response.list[i*8].dt * 1000);
                console.log(myDate.toLocaleDateString());
                newColumn.append($("<h4>").html(myDate.toLocaleDateString()));

                var iconCode = response.list[i*8].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                newColumn.append($("<img>").attr("src", iconURL));

                var temp = Math.round((response.list[i*8].main.temp - 273.15) * 1.80 + 32);
                newColumn.append($("<p>").html("Temp: " + temp + " &#176;F"));

                var humidity = response.list[i*8].main.humidity;
                newColumn.append($("<p>").html("Humidity: " + humidity + "&#37;"));

            }
        })
    })
};
$("#searchCity").click(function (event) {
    city = $("#city").val();
    getData();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var cityButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityButton.text(city);
        $(".list-group").append(cityButton);
    };
});

$(".list-group-item").click(function (event) {
    city = $(this).text();
    getData();
});




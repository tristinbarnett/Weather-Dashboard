var city;


$("#searchCity").click(function (event) {
    city = $("#city").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=6ae2d75d12546b3e67c1a101fdff49bc"

    var cityButton = $("<a>").attr({
        class: "list-group-item list-group-item-action",
        href: "#"
    });
    cityButton.text(city);
    $(".list-group").append(cityButton);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    })
})

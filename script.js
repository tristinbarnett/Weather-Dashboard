$("#searchCity").click(function(event){
   var city =  $("#city").val();
   console.log(city);
   var cityButton = $("<a>").attr({
       class: "list-group-item list-group-item-action",
       href: "#"
   });
   cityButton.text(city);
   $(".list-group").append(cityButton);
})
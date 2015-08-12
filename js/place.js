$(function () {
    $("#btn-place").click(function () {
        getPlaces();
        gotoPlace();
    });

    $("#btn-close-place").click(function () {
        closePlace();
    });
});

var closePlace = function () {
    $('#place-page').removeClass('visible');
};

var gotoPlace = function () {
    $('#place-page').addClass('visible');
};

var getPlaces = function(){
    var apiURLPlaces = getSetting('APIURL')+"?method=getPlaces";
    console.log('loadPlaces----'+apiURLPlaces);
    $.getJSON(apiURLPlaces, {
        format: "json"
    })
            .done(function (data) {
                console.log("logetPlacesgaccess...");
                console.log(data);
                loadPlaces(data.places);
            });
}

var loadPlaces =  function (data){
    $('#table-place').dataTable({
        "data": data,
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "comments"}
        ]
    });
}

var addPlace = function(){
    
}
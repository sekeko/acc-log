$(function () {

    initPlaceTable();

    $("#btn-place").click(function () {
        getPlaces();
        gotoPlace();
    });
    $("#btn-save-place").click(function () {
        addPlace();
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

var getPlaces = function () {
    var apiURLPlaces = getSetting('APIURL') + "?method=getPlaces";
    $.getJSON(apiURLPlaces, {
        format: "json"
    })
            .done(function (data) {
                loadPlaces(data.places);
            });
}

var initPlaceTable = function () {
    $('#table-place').dataTable({
        //"data": data,
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "comments"}
        ]
    });
}

var loadPlaces = function (data) {
    var oTable = $('#table-place').dataTable();
    // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
    oTable.fnClearTable();
    oTable.fnAddData(data);
    oTable.fnDraw();
}

var addPlace = function () {
    var placeToAdd = {"place": $("#mui-place-name").val()
        , "comments": $("#mui-place-comments").val()
        , "updatedBy": getUserIdLogged()};
    var apiURL = getSetting('APIURL') + "?method=addplace&post_data_string=" + JSON.stringify(placeToAdd);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log("logaccess...");
                getPlaces();
                //this.cleanForm();
            });
}
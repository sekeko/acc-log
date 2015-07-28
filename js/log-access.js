$(function () {
    $("#idNumber").change(function () {
        var userNumber = $("#idNumber").val();
        console.log("userNumber=" + userNumber);
        getUserByNumber(userNumber);
        //loginUser(userNumber);

    });

    $("#btn-in").click(function () {
        logPersonAccess('IN');
    });
    $("#btn-out").click(function () {
        logPersonAccess('OUT');
    });
});

var cleanForm = function(){
    $('#personId').val('');
    $('#expiryDate').val('');
    $('#birthDate').val('');
    $('#gender').val('');
    $('#idNumber').val('');
    $('#fullName').val('');
    $('#comments').val('');
}

var logPersonAccess = function (accessType) {
    var accValues = {
        idPerson: $('#personId').val(),
        idPlace: $('#mui-select-placeTo').find(":selected").val(),
        accessType: accessType,
        date: new Date().toString('yyyy-M-d HH:mm:ss'),
        updateBy: getUserIdLogged(),
        comments: $('#comments').val()
    };
    //console.log(JSON.stringify(accValues));

    var apiURL = getSetting('APIURL') + "?method=logaccess&post_data_string=" + JSON.stringify(accValues);
    console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                console.log("logaccess...");
                console.log(data);
                cleanForm();
            });

};

var loadLogAccessFormControlsValues = function () {
    //http://localhost:9980/acc/?method=getPlaces
    var apiURL = getSetting('APIURL') + "?method=getPlaces";
    createDropdown("mui-select-placeTo", "mui-select-placeTo", apiURL);
};

var loadUserData = function (data) {
    $("#personId").val(data.id);
    $("#idNumber").val(data.number);
    $("#fullName").val(data.fullname);
    $("#birthDate").val(data.birth);
    $("#expiryDate").val(data.expiry);
    $("#gender").val(data.gender);
    $("#comments").val(data.comments);
};

var getUserByNumber = function (userNumber) {
    //?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}
    var apiURL = getSetting('APIURL') + "?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                console.log("getUserByNumber...");
                console.log(data);
                loadUserData(data.person);
            });
};

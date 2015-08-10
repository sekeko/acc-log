$(function () {

    setCurrentDisplayName("login");

    $("#button-login").click(function () {
        var userNumber = $("#mui-user-number").val();
        loginUser(userNumber);
    });
    
});

var loginUser = function (userNumber) {
    //var apiURL = "http://localhost:81/acc-log-api/?method=login&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    var apiURL = getSetting('APIURL')+"?method=login&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    //console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                if (data.status === "ok") {
                    if (data.id) {
                        cleanErrorMessage("main-error-message");
                        setUserIdLogged(data.id);
                        loadLogAccessFormControlsValues();
                        logUserAccess('IN');
                        $('#login').removeClass('visible');
                        $('.log-access').addClass('visible');
                        setCurrentDisplayName("accesslog");
                    }
                }
                else{
                    showErrorMessage("main-error-message", " Login Fail! ");  
                }
                //console.log(data);
            });
            //.error(fuction(data){console.log(data);});
};

var logUserAccess = function (accessType) {
    var accValues = {
        idPerson: getUserIdLogged(),
        idPlace: "1",
        accessType: accessType,
        date: new Date().toString('yyyy-M-d HH:mm:ss'),
        updateBy: getUserIdLogged(),
        comments: "----"
    };
    var apiURL = getSetting('APIURL') + "?method=logaccess&post_data_string=" + JSON.stringify(accValues);
    //console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log("logaccess...");
                //console.log(data);
            });
};
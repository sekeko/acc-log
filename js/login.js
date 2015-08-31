$(function () {

    setCurrentDisplayName("login");

    $("#button-login").click(function () {
        var userNumber = $("#mui-user-number").val();
        $("#mui-user-number").val("");
        loginUser(userNumber);
    });

    $("#btn-logout").click(function () {
        logout();
    });

});

var loginUser = function (userNumber) {
    var apiURL = getSetting('APIURL') + "?method=login&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    //console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                if (data.status === "ok") {
                    if (data.user.id) {
                        enableUserOptions(data.user.isSystemUser);
                        cleanErrorMessage("main-error-message");
                        setUserIdLogged(data.user.id);
                        loadLogAccessFormControlsValues();
                        logUserAccess('IN');
                        $('#login').removeClass('visible');
                        $('.log-access').addClass('visible');
                        setCurrentDisplayName("accesslog");
                    }
                }
                else {
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

var logout = function () {
    setUserIdLogged("");
    $('#login').addClass('visible');
    $('.log-access').removeClass('visible');
    setCurrentDisplayName("login");
    disableUserOptions();
};

var enableUserOptions = function (userType) {
    if (userType === "3") {
        $("#btn-report").removeAttr("disabled");
    }
    if (userType === "2") {
        $("#btn-report").removeAttr("disabled");
        $("#btn-user-comments").removeAttr("disabled");
    }
    if (userType === "1") {
        $("#btn-report").removeAttr("disabled");
        $("#btn-user-comments").removeAttr("disabled");
        $("#btn-place").removeAttr("disabled");
        $("#btn-user").removeAttr("disabled");
    }

};

var disableUserOptions = function () {
    $("#btn-report").attr("disabled", "disabled");
    $("#btn-place").attr("disabled", "disabled");
    $("#btn-user").attr("disabled", "disabled");
    $("#btn-user-comments").attr("disabled", "disabled");
}
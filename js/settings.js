$(function () {
    $("#btn-settings").click(function () {
        console.log("click on btn-settings");
        gotoSettings();
    });

    $("#btn-close-settings").click(function () {
        var settings = JSON.stringify({
            'APIURL': $('#mui-user-apiURL').val(),
            'COMPort': $('#mui-select-comport').find(":selected").text(),
        });
        saveSettings(settings);
        closeSettings();
    });

});

var testDeviceConnection = function (port) {

}

function gotoSettings() {
    //setCurrentDisplayName("settings");
    loadCOMPorts();
    $('#settings-page').addClass('visible');
};

var closeSettings = function () {
    $('#settings-page').removeClass('visible');
};

var loadCOMPorts = function () {
    chrome.serial.getDevices(function (ports) {
        if (ports.length <= 0) {
            showErrorMessage("settings-error-message", " No ports ");
        } else {
            cleanErrorMessage("settings-error-message");
            var strControl = "<select id='mui-select-comport'>";
            for (var i = 0; i < ports.length; i++) {
                strControl += "<option value='" + ports[i].path + "'>" + ports[i].path + "</option>";
            }
            strControl += "</select>";
            $("#mui-select-comport-container").html(strControl);
            /*$("#mui-select-comport").change(function () {
                var port = $('#mui-select-comport').find(":selected").text();
                connection.connect(port);
                console.log("-----" + $('#mui-select-comport').find(":selected").text());
            });*/
        }
    });
};

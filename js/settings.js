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

function gotoSettings() {
    //setCurrentDisplayName("settings");
    loadCOMPorts();
    $('#settings-page').addClass('visible');
}
;

var closeSettings = function () {
    $('#settings-page').removeClass('visible');
}

var loadCOMPorts = function () {
    chrome.serial.getDevices(function (ports) {
        if (ports.length <= 0) {
            showErrorMessage("settings-error-message"," No ports ");
        } else {
            cleanErrorMessage("settings-error-message");
            var strControl = "<select id='mui-select-comport'>";
            for (var i = 0; i < ports.length; i++) {
                strControl += "<option value='" + ports[i].path + "'>" + ports[i].path + "</option>";
            }
            strControl += "</select>";
            $("#mui-select-comport-container").html(strControl);
        }
    });
};

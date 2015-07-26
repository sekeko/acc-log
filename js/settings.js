$(function () {

    //loadCOMPorts();
    //console.log("settings load");

    $("#btn-settings").click(function () {
        console.log("click on btn-settings");
        gotoSettings();
    });

    $("#btn-close-settings").click(function () {
        console.log("click on btn-close-settings");
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
    console.log("call loadCOMPorts");
    chrome.serial.getDevices(function (ports) {
        console.log("call onGetDevices");
        console.log(ports);
        if (ports.length <= 0) {
            console.log("no ports");
            $("#settings-error-message").html(" No ports ");
        } else {
            $("#settings-error-message").html("");
            var strControl = "<select id='mui-select-comport'>";
            for (var i = 0; i < ports.length; i++) {
                strControl += "<option value='" + ports[i].path + "'>" + ports[i].path + "</option>";
                console.log(ports[i].path);
            }
            strControl += "</select>";
            $("#mui-select-comport-container").html(strControl);
        }
    });
};

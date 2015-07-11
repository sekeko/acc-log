$(function () {

    //setCurrentDisplayName("settings");

    $("#btn-settings").click(function () {
        gotoSettings();
    });
    
    $("#btn-close-settings").click(function () {
        closeSettings();
    });
    
    loadCOMPorts();
});

var gotoSettings = function () {
    $('#settings-page').addClass('visible');
};

var closeSettings = function(){
    $('#settings-page').removeClass('visible');
}

var loadCOMPorts = function () {    
    
    var onGetDevices = function (ports) {
        var strControl = "<select id='mui-select-comport'>";
        for (var i = 0; i < ports.length; i++) {
            strControl += "<option value='" + ports[i].path + "'>" + ports[i].path + "</option>";
            //console.log(ports[i].path);
        }
        strControl += "</select>";
        $("#mui-select-comport-container").append(strControl);
    };
    chrome.serial.getDevices(onGetDevices);
    
    
};

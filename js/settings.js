$(function () {
    $("#btn-settings").click(function () {
        gotoSettings();
    });

    $("#btn-close-settings").click(function () {
        var settings = JSON.stringify({
            'APIURL': $('#mui-user-apiURL').val(),
            'COMPort': $('#mui-select-comport').find(":selected").text(),
        });
        saveSettings(settings);
        loadSettingsMemory();
        closeSettings();
    });

});

var testDeviceConnection = function (port) {

}

function gotoSettings() {
    //setCurrentDisplayName("settings");
    loadCOMPorts();
	//loadUSBDevices();
	//loadHIDDevices();
    //loadSettingOnForm();
    $('#settings-page').addClass('visible');
}
;

var closeSettings = function () {
    $('#settings-page').removeClass('visible');
};
/*
var loadUSBDevices = function(){
	var vendorid = parseInt( '0C2E', 16 );
	var productid = parseInt( '0200', 16 );
	
	chrome.usb.getDevices({"vendorId": vendorid, "productId": productid}, function(found_devices) {
	  if (chrome.runtime.lastError != undefined) {
		console.warn('chrome.usb.getDevices error: ' +
					 chrome.runtime.lastError.message);
		return;
	  }
	  else{
		console.log(found_devices);
	  }
	});
}
*/
var loadHIDDevices = function(){
	var vendorid = parseInt( '0C2E', 16 );
	var productid = parseInt( '0200', 16 );
	chrome.hid.getDevices({"vendorId": 0x0C2E, "productId": 0x0200}, function(found_devices) {
	  if (chrome.runtime.lastError != undefined) {
		console.warn('chrome.usb.getDevices error: ' +
					 chrome.runtime.lastError.message);
		return;
	  }
	  else{
		console.log(found_devices);
	  }
	});
	
}


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

var loadSettingOnForm = function () {
    $('#mui-user-apiURL').val(getSetting("APIURL"));
    $('#mui-select-comport').val(getSetting("COMPort"));
};

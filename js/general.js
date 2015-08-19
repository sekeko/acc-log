/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var userIdLogged, appAPIURL, appCOMPort = 'COM11';

$(function () {

    loadSettingsMemory();

    $("#right-sidebar").sidebar({side: "right"});
    $("#appbar-more-vert").on("click", function () {
        $("#right-sidebar").trigger("sidebar:open");
        return false;
    });
    $("#close-right-side-menu").on("click", function () {
        $("#right-sidebar").trigger("sidebar:close");
        return false;
    });
});

var setCurrentDisplayName = function (displayName) {
    window.location.hash = displayName;
};

var getCurrentDisplayName = function () {
    var temp = window.location.hash.split('/')[0];
    return temp.replace("#", "");
};

var showErrorMessage = function (labelName, message) {
    $("#" + labelName).html(message);
};
var cleanErrorMessage = function (labelName) {
    $("#" + labelName).html("");
};

var saveSettings = function (settings) {
    chrome.storage.local.set({"settings": JSON.parse(settings)}, function () {
        console.log('Settings saved');
    });
};

var getSetting = function (name) {
    var returnVal = '';

    if (name == 'COMPort') {
        returnVal = appCOMPort;
    }

    if (name == 'APIURL') {
        returnVal = appAPIURL;
    }
    return returnVal;
};

var loadSettingsMemory = function () {
    chrome.storage.local.get("settings", function (result) {
        console.log(result);
        //console.log(result.settings[name]);
        appAPIURL = result.settings["APIURL"];
        appCOMPort = result.settings["COMPort"];

        var connection = new SerialConnection();
        connection.onConnect.addListener(function () {
            log('connected to: ' + getSetting('COMPort'));
        });
        connection.onReadLine.addListener(function (line) {
            log('read line: ' + line);
        });
        connection.connect(getSetting('COMPort'));

    });
}

var getUserIdLogged = function () {
    //return 1;
    return userIdLogged;
}
var setUserIdLogged = function (userId) {
    //return 1;
    userIdLogged = userId;
}
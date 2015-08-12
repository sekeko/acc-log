/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var userIdLogged;

$(function () {
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
    var returnVal = 'http://localhost:81/acc-log-api/';
    chrome.storage.local.get("settings", function (result) {
        console.log(result);
        console.log(result.settings[name]);
        returnVal = result.settings[name];
    });
    if (name == 'COMPort') {
        returnVal = 'COM11';
    }
    return returnVal;
};

var getUserIdLogged = function () {
    //return 1;
    return userIdLogged;
}
var setUserIdLogged = function (userId) {
    //return 1;
    userIdLogged = userId;
}
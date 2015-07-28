/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
    $("#" + labelName).html();
};
//var getCOMPortConfigured = function () {
//    var returnVal = $('#mui-select-comport').find(":selected").text();
//    if (returnVal == '') {
//        console.log('getCOMPortConfigured blank ');
//        returnVal = 'COM11';
//    }
//    return returnVal;
//};
//var getApiUrlConfigured = function () {
//    return $('#mui-user-apiURL').val();
//};

var saveSettings = function (settings) {
    chrome.storage.local.set({"settings" : JSON.parse(settings)}, function () {
        console.log('Settings saved');
    });
};

var getSetting = function(name){
    var returnVal = 'http://localhost:81/acc-log-api/';
    chrome.storage.local.get("settings", function (result) {
        console.log(result);
        console.log(result.settings[name]);
        returnVal = result.settings[name];
    });
    if(name == 'COMPort'){
        returnVal = 'COM11';
    }
    return returnVal;
};

var getUserIdLogged = function(){
    return 1;
}
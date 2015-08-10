/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {
    $("#btn-report").click(function () {
        console.log("click on btn-report");
        gotoReport();
    });

    $("#btn-close-settings").click(function () {
        
        //closeSettings();
    });
});

function gotoReport() {
    //setCurrentDisplayName("settings");
    $('#report-page').addClass('visible');
}
;


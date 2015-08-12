/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {

    $('#example').dataTable({
        "ajax": 'http://localhost:81/acc-log-api/?method=getAccessLog',
        "columns": [
            {"data": "FECHA"},
            {"data": "TIPO"},
            {"data": "LUGAR"},
            {"data": "NOMBRE"}
        ]
    });

    $("#btn-report").click(function () {
        console.log("click on btn-report");
        gotoReport();
    });

    $("#btn-close-report").click(function () {
        closeReport();
    });
});

var closeReport = function () {
    $('#report-page').removeClass('visible');
};

var gotoReport = function () {
    $('#report-page').addClass('visible');
};



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function () {

    loadReportCurrentDay();

    $("#btn-report").click(function () {
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
    getReportData();
    $('#report-page').addClass('visible');
};

var loadReportCurrentDay = function () {
    $('#table-log-access-report').dataTable({
        "columns": [
            {"data": "FECHA"},
            {"data": "TIPO"},
            {"data": "LUGAR"},
            {"data": "NOMBRE"},
            {"data": "COMENTARIO"}
        ]
    });
}

var getReportData = function () {
    var dateRange = {fromDate: new Date().toString('yyyy-M-d 00:00:00'),
        toDate: new Date().toString('yyyy-M-d 59:59:59')};
    var apiURL = getSetting('APIURL') + "?method=getAccessLog&post_data_string=" + JSON.stringify(dateRange);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                refreshReport(data.data);
            });
}

var refreshReport = function (data) {

    var oTable = $('#table-log-access-report').dataTable();
    oTable.fnClearTable();
    oTable.fnAddData(data);
    oTable.fnDraw();
}
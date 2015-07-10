/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var createDropdown = function (controlName, containerName, apiURL) {

    var strControl = "<select id='" + controlName + "'>"
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                $.each(data.places, function (i, item) {
                    strControl += "<option value='" + item.id + "'>" + item.name + "</option>";

                });
                strControl += "</select>";
                $("#" + containerName).append(strControl);
            });
};



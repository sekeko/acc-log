$(function(){
   init();
});

var init = function(){
    createDropdown("placeTo","mui-select-placeTo" ,"http://localhost:9980/acc/?method=getPlaces");
};

var loadUserData = function(numCedula,nombreCompleto, genero,fechaNacimiento,fechaVencimiento){
    $("#idNumber").val(numCedula);
    $("#fullName").val(nombreCompleto);
    $("#birthDate").val(fechaNacimiento);
    $("#expiryDate").val(fechaVencimiento);
    $("#gender").val(fechaNacimiento);    
};

var getUserByNumber =  function (numCedula,apiURL,onSucces){
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                onSucces(data);
            });
};

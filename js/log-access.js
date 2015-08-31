$(function () {
    $("#idNumber").change(function () {
        var userNumber = $("#idNumber").val();
        //console.log("userNumber=" + userNumber);
        if (userNumber !== "") {
            getUserByNumber(userNumber);
        }
    });

    $("#btn-in").click(function () {
        checkIfPersonExists('IN');
    });
    $("#btn-out").click(function () {
        checkIfPersonExists('OUT');
    });
});

var clearForm = function () {
    $('#personId').val('');
    $('#expiryDate').val('');
    $('#birthDate').val('');
    $('#gender').val('');
    $('#idNumber').val('');
    $('#fullName').val('');
    $('#comments').val('');
    $('#admin-comments').val('');
};

var addPerson = function (personToAdd, accessType) {
    var apiURL = getSetting('APIURL') + "?method=addperson&post_data_string=" + JSON.stringify(personToAdd);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log("logaccess...");
                var accValues = {
                    idPerson: data.person.id,
                    idPlace: $('#mui-select-placeTo').find(":selected").val(),
                    accessType: accessType,
                    date: new Date().toString('yyyy-M-d HH:mm:ss'),
                    updatedBy: getUserIdLogged(),
                    comments: $('#comments').val()
                };
                logPersonAccess(accValues);
                //console.log(data);
                clearForm();
            });
}

var checkIfPersonExists = function (accessType) {
    var personId = $('#personId').val();
    var accValues = {
        idPerson: $('#personId').val(),
        idPlace: $('#mui-select-placeTo').find(":selected").val(),
        accessType: accessType,
        date: new Date().toString('yyyy-M-d HH:mm:ss'),
        updatedBy: getUserIdLogged(),
        comments: $('#comments').val()
    };
    //console.log(JSON.stringify(accValues));
    if (personId === "0") {
        var personValues = {
            number: $('#idNumber').val(),
            fullname: $('#fullName').val(),
            birth: $("#birthDate").val(),
            expiry: $("#expiryDate").val(),
            gender: $("#gender").val(),
            updatedBy: getUserIdLogged(),
            comments: $('#comments').val()
        };
        addPerson(personValues, accessType);
    }
    else {
        logPersonAccess(accValues);
    }
};

var logPersonAccess = function (accValues) {
    var apiURL = getSetting('APIURL') + "?method=logaccess&post_data_string=" + JSON.stringify(accValues);
    //console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log("logaccess...");
                //console.log(data);
                clearForm();
            });
}

var loadLogAccessFormControlsValues = function () {
    //http://localhost:9980/acc/?method=getPlaces
    var apiURL = getSetting('APIURL') + "?method=getPlaces";
    createDropdown("mui-select-placeTo", "mui-select-placeTo", apiURL);
};

var loadUserData = function (data) {
    $("#personId").val(data.id);
    $("#idNumber").val(data.number);
    $("#fullName").val(data.fullname);
    $("#birthDate").val(data.birth);
    $("#expiryDate").val(data.expiry);
    $("#gender").val(data.gender);
    $("#admin-comments").val(data.comments);
    $("#comments").val(data.lastcomment);
};

var loadUserDataFromDocument = function (data) {
    $("#idNumber").val(data.number);
    $("#fullName").val(data.fullname);
    $("#birthDate").val(data.birth);
    $("#expiryDate").val(data.expiry);
    $("#gender").val(data.gender);
};

var getUserByNumber = function (userNumber, person) {
    //?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}
    var apiURL = getSetting('APIURL') + "?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log(data);
                if (data.person.id === 0) {
                    //console.log('no person found');
                    if (person) {
                        loadUserDataFromDocument(person);
                    }
                }
                else {
                    loadUserData(data.person);
                }
            });
};

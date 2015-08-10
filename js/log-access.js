$(function () {
    $("#idNumber").change(function () {
        var userNumber = $("#idNumber").val();
        console.log("userNumber=" + userNumber);
        getUserByNumber(userNumber);
        //loginUser(userNumber);
    });

    $("#btn-in").click(function () {
        checkIfPersonExists('IN');
    });
    $("#btn-out").click(function () {
        checkIfPersonExists('OUT');
    });
});

var cleanForm = function () {
    $('#personId').val('');
    $('#expiryDate').val('');
    $('#birthDate').val('');
    $('#gender').val('');
    $('#idNumber').val('');
    $('#fullName').val('');
    $('#comments').val('');
};

var addPerson = function (personToAdd, accessType) {
    //"number":"111010745","fullname":"111010745","birth":"111010745","expiry":"111010745","gender":"M","comments":"111010745","updatedBy":"111010745"
    var apiURL = getSetting('APIURL') + "?method=addperson&post_data_string=" + JSON.stringify(personToAdd);
    //console.log(apiURL);
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
                console.log(data);
                cleanForm();
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
        addPerson(personValues,accessType);
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
                cleanForm();
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
    $("#comments").val(data.comments);
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
                    loadUserDataFromDocument(person);
                    console.log('no person found');
                }
                else {
                    loadUserData(data.person);
                }
            });
};

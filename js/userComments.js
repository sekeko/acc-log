$(function () {

    $("#idNumber-comments").change(function () {
        var userNumber = $("#idNumber-comments").val();
        console.log("userNumber=" + userNumber);
        searchUserByNumber(userNumber);
        //loginUser(userNumber);
    });

    $("#btn-user-comments").click(function () {
        gotoUserComments();
    });

    $("#btn-close-user-comments").click(function () {
        closeUserComments();
    });
    $("#btn-save-comment").click(function () {
        setPersonComments();
    });
});

var closeUserComments = function () {
    $('#user-comments-page').removeClass('visible');
};

var gotoUserComments = function () {
    $('#user-comments-page').addClass('visible');
};

var searchUserByNumber = function (userNumber) {
    //?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}
    var apiURL = getSetting('APIURL') + "?method=getPersonByNumber&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log(data);
                if (data.person.id === 0) {
                    //loadUserDataFromDocument(person);
                    console.log('no person found');
                }
                else {
                    loadFoundUserData(data.person);
                }
            });
};

var loadFoundUserData = function (data) {
    $("#personId-comments").val(data.id);
    $("#idNumber-comments").val(data.number);
    $("#fullName-comments").val(data.fullname);
    $("#birthDate-comments").val(data.birth);
    $("#expiryDate-comments").val(data.expiry);
    $("#gender-comments").val(data.gender);
    $("#comments-comments").val(data.comments);
};

var setPersonComments = function () {
    var userCommentsToUpdate = {
        "idPerson": $("#personId-comments").val()
        , "comments": $("#comments-comments").val()
        , "updatedBy": getUserIdLogged()
    };
    var apiURL = getSetting('APIURL') + "?method=setPersonComment&post_data_string=" + JSON.stringify(userCommentsToUpdate);
    //console.log(apiURL);
    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                //console.log("logaccess...");
                console.log(data);
                cleanCommentsForm();
            });
}

var cleanCommentsForm = function () {
    $("#personId-comments").val("");
    $("#idNumber-comments").val("");
    $("#fullName-comments").val("");
    $("#birthDate-comments").val("");
    $("#expiryDate-comments").val("");
    $("#gender-comments").val("");
    $("#comments-comments").val("");
}
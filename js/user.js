$(function () {

    initUserTable();

    $("#btn-user").click(function () {
        getUsers();
        gotoUser();
    });

    $("#btn-close-user").click(function () {
        closeUser();
    });

    $("#btn-user-admin").click(function () {
        setUserType(1);
    });

    $("#btn-user-supervisor").click(function () {
        setUserType(2);
    });

    $("#btn-user-operator").click(function () {
        setUserType(3);
    });

    $('#table-user').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $('#table-user  ').dataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});

var closeUser = function () {
    $('#user-page').removeClass('visible');
};

var gotoUser = function () {
    $('#user-page').addClass('visible');
};

var getUsers = function () {
    var apiURLUsers = getSetting('APIURL') + "?method=getUsers";
    $.getJSON(apiURLUsers, {
        format: "json"
    })
            .done(function (data) {
                loadUsers(data.users);
            });
}

var initUserTable = function () {
    $('#table-user').dataTable({
        "pageLength": 5,
        "columns": [
            {"data": "id"},
            {"data": "number"},
            {"data": "fullname"},
            {"data": "isSystemUser"},
            {"data": "comments"}
        ]
    });
}

var setUserType = function (userid, usertype) {
    console.log("userid = " + userid);
    console.log("usertype = " + usertype);
}

var loadUsers = function (data) {
    var oTable = $('#table-user').dataTable();
    oTable.fnClearTable();
    oTable.fnAddData(data);
    oTable.fnDraw();
}

var setUserType = function (type) {
    var rowData = $('#table-user').DataTable().row('.selected').data();
    if (rowData) {
        var userData = {
            "idPerson": rowData.id
            , "userType": type
            , "updatedBy": getUserIdLogged()
        };
        var apiURL = getSetting('APIURL') + "?method=setUserType&post_data_string=" + JSON.stringify(userData);
        //console.log(apiURL);
        $.getJSON(apiURL, {
            format: "json"
        })
                .done(function (data) {
                    getUsers();
                });
    }
};
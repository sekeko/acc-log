$(function () {

    initUserTable();

    $("#btn-user").click(function () {
        getUsers();
        gotoUser();
    });

    $("#btn-close-user").click(function () {
        closeUser();
    });
    $("#btn-set-user-type").click(function () {
        console.log(this)
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
        //"data": data,
        "columns": [
            {"data": "id"},
            {"data": "number"},
            {"data": "fullname"},
            {"data": "isSystemUser"},
            {"data": "comments"},
            {"data": "id"}
        ],
        "columnDefs": [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    var toRender = "<a id='btn-set-user-type' data-user-type='1' data-user-id='"+data+"' onclick='setUserType(1,"+data+")'>A</a>&nbsp;&nbsp;";
                    toRender += "<a id='btn-set-user-type' data-user-type='2' data-user-id='"+data+"'>S</a>&nbsp;&nbsp;";
                    toRender += "<a id='btn-set-user-type' data-user-type='3' data-user-id='"+data+"'>O</a>";
                    return toRender;
                },
                "targets": 5
            },
        ]
    });
}

var setUserType = function(userid, usertype){
    console.log("userid = "+userid);
    console.log("usertype = "+usertype);
}

var loadUsers = function (data) {
    var oTable = $('#table-user').dataTable();
    // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
    oTable.fnClearTable();
    oTable.fnAddData(data);
    oTable.fnDraw();
}
$(function () {

    setCurrentDisplayName("login");

    $("#button-login").click(function () {
        var userNumber = $("#mui-user-number").val();
        loginUser(userNumber);
    });
});

var loginUser = function (userNumber) {
    var apiURL = "http://localhost:81/acc-log-api/?method=login&post_data_string={%22user_number%22:%22" + userNumber + "%22}";
    console.log(apiURL);

    $.getJSON(apiURL, {
        format: "json"
    })
            .done(function (data) {
                if (data.status === "ok") {
                    if (data.id) {
                        $('#login').removeClass('visible');
                        $('.log-access').addClass('visible');

                        setCurrentDisplayName("accesslog");
                    }
                }
                console.log(data);
            });
            //.error(fuction(data){console.log(data);});
};

$(document).ready(function () {
    $.ajax({
        url: "/api/microtik/userpas",
        method: "GET",
        success: function (response) {
            console.log(response)
            $("#wifi_User").val(response.data.user);
            $("#wifi_Password").val(response.data.password);
        },
        error: function (error) {
            console.error(error.responseJSON)
            $("#simrs_accoun").html("<strong>" + error.responseJSON.message + "</strong> <br> <small>Silahkan Hubungi IT</small>");
        },
    });
});
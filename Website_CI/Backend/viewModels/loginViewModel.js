// login
$(document).ready(function(){
    $("#setUser").click(function() {
        console.log("button setUser clicked");

        var benutzername = $("#user").val();
        var passwort = $("#pwd").val();

        var obj = {benutzername, passwort  };

        
        $.ajax({
            url: "http://localhost:8000/api/user/login/"+benutzername,
            method: "get",
            dataType: "json"
        }).done(function (response) {
            console.log(response);
            $("#output").html(JSON.stringify(response));
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
    });
});

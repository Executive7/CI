// registrieren
$(document).ready(function(){
    $("#setUser").click(function() {
        console.log("button setUser clicked");

        var benutzername = $("#benutzername").val();
        var vorname = $("#vorname").val();
        var nachname =$("#nachname").val();
        var email = $("#email").val();
        var strasse = $("#adresse").val();
        var plz = $("#plz").val();
        var stadt = $("#stadt").val();
        var passwort = $("#passwort").val();

        var obj = {benutzername, vorname, nachname, email,passwort, strasse, plz, stadt  };
        localStorage.setItem("key", "hallölle");
        
        $.ajax({
            url: "http://localhost:8000/api/user",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify(obj)
        }).done(function (response) {
            console.log(response);
            $("#output").html(JSON.stringify(response));    
        }).fail(function (jqXHR, statusText, error) {
            console.log("Response Code: " + jqXHR.status + " - Fehlermeldung: " + jqXHR.responseText);
            $("#output").html("Ein Fehler ist aufgetreten");
        });
    });
});

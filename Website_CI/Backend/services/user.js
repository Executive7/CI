const helper = require("../helper.js");
const UserDao = require("../dao/userDao.js");
const express = require("express");
var serviceRouter = express.Router();

serviceRouter.get("/user/gib/:id", function(request, response) {
    helper.log("Service Adresse: Client requested one record, id=" + request.params.id);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.loadById(request.params.id);
        helper.log("Service Adresse: Record loaded");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/user/alle", function(request, response) {
    helper.log("Service Adresse: Client requested all records");

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.loadAll();
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/user/login/:benutzername", function(request, response) {
    helper.log("Service Adresse: Client requested all records");
    
    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.loadUser(request.params.benutzername);
        helper.log("Service Adresse: Records loaded, count=" + result.length);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error loading all records. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.get("/user/existiert/:id", function(request, response) {
    helper.log("Service Adresse: Client requested check, if record exists, id=" + request.params.id);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.exists(request.params.id);
        helper.log("Service Adresse: Check if record exists by id=" + request.params.id + ", result=" + result);
        response.status(200).json(helper.jsonMsgOK({ "id": request.params.id, "existiert": result }));
    } catch (ex) {
        helper.logError("Service Adresse: Error checking if record exists. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

serviceRouter.post("/user", function(request, response) {
    helper.log("Service Adresse: Client requested creation of new record");

    var errorMsgs=[];
    if (request.body.benutzername === "") {
        errorMsgs.push("benutzername fehlt");
    
    }
    if (request.body.vorname === "") {
        errorMsgs.push("vorname fehlt");
    }
    if (request.body.nachname === "") {
        errorMsgs.push("nachname fehlt");
    }
    if (request.body.email === "") {
        errorMsgs.push("email fehlt");
    }
    if (request.body.passwort === "") {
        errorMsgs.push("passwort fehlt");
    }
    if (request.body.strasse ==="") {
        errorMsgs.push("strasse fehlt");
    }
    if (request.body.plz === "") {
        errorMsgs.push("plz fehlt");
    }
    if (request.body.stadt === "") {
        errorMsgs.push("stadt fehlt");
    }
    
    
    if (errorMsgs.length > 0) {
        helper.log("Service Adresse: Creation not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Hinzufügen nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }
    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.create(request.body.benutzername, request.body.vorname, request.body.nachname, request.body.email, request.body.passwort ,request.body.strasse, request.body.plz, request.body.stadt);
        helper.log("Service Adresse: Record inserted");
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error creating new record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.put("/user", function(request, response) {
    helper.log("Service Adresse: Client requested update of existing record");
    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push("id fehl");
    if (helper.isUndefined(request.body.strasse)) 
        errorMsgs.push("strasse fehl");
    if (helper.isUndefined(request.body.hausnummer)) 
        errorMsgs.push("hausnummer fehl");
    if (helper.isUndefined(request.body.adresszusatz)) 
        request.body.adresszusatz = "";
    if (helper.isUndefined(request.body.plz)) 
        errorMsgs.push("plz fehl");
    if (helper.isUndefined(request.body.ort)) 
        errorMsgs.push("ort fehl");
    if (helper.isUndefined(request.body.land)) {
        errorMsgs.push("land fehl");
    } else if (helper.isUndefined(request.body.land.id)) {
        errorMsgs.push("land.id fehl");
    }

    if (errorMsgs.length > 0) {
        helper.log("Service Adresse: Update not possible, data missing");
        response.status(400).json(helper.jsonMsgError("Update nicht möglich. Fehlende Daten: " + helper.concatArray(errorMsgs)));
        return;
    }

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var result = userDao.update(request.body.id, request.body.strasse, request.body.hausnummer, request.body.adresszusatz, request.body.plz, request.body.ort, request.body.land.id);
        helper.log("Service Adresse: Record updated, id=" + request.body.id);
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError("Service Adresse: Error updating record by id. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }    
});

serviceRouter.delete("/user/:id", function(request, response) {
    helper.log("Service Adresse: Client requested deletion of record, id=" + request.params.id);

    const userDao = new UserDao(request.app.locals.dbConnection);
    try {
        var obj = userDao.loadById(request.params.id);
        userDao.delete(request.params.id);
        helper.log("Service Adresse: Deletion of record successfull, id=" + request.params.id);
        response.status(200).json(helper.jsonMsgOK({ "gelöscht": true, "eintrag": obj }));
    } catch (ex) {
        helper.logError("Service Adresse: Error deleting record. Exception occured: " + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

module.exports = serviceRouter;
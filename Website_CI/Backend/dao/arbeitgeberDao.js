const helper = require("../helper.js");

class ArbeitgeberDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {

        var sql = "SELECT * FROM Arbeitgeber WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error("No Record found by id=" + id);

        result = helper.objectKeysToLower(result);

        return result;
    }

    loadAll() {

        var sql = "SELECT * FROM Arbeitgeber";
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        result = helper.arrayObjectKeysToLower(result);

        return result;
    }

    exists(id) {
        var sql = "SELECT COUNT(ID) AS cnt FROM Arbeitgeber WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = "",  stundenlohn = "", adresseID = null) {
        var sql = "INSERT INTO Arbeitgeber (name,stundenlohn,adresseID) VALUES (?,?,?)";
        var statement = this._conn.prepare(sql);
        var params = [name, stundenlohn, adresseID];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not insert new Record. Data: " + params);

        var newObj = this.loadById(result.lastInsertRowid);
        return newObj;
    }

    update(id, name = "",  stundenlohn = "", adresseID = null) {
        var sql = "UPDATE Arbeitgeber SET name=?,stundenlohn=?,adresseID=? WHERE ID=?";
        var statement = this._conn.prepare(sql);
        var params = [name, stundenlohn, adresseID, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error("Could not update existing Record. Data: " + params);

        var updatedObj = this.loadById(id);
        return updatedObj;
    }

    delete(id) {
        try {
            var sql = "DELETE FROM Arbeitgeber WHERE ID=?";
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error("Could not delete Record by id=" + id);

            return true;
        } catch (ex) {
            return false;
            throw new Error("Could not delete Record by id=" + id + ". Reason: " + ex.message);
        }
    }

    toString() {
        helper.log("ArbeitgeberDao [_conn=" + this._conn + "]");
    }
}

module.exports = ArbeitgeberDao;
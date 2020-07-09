const Database = require("better-sqlite3");
const dbOptions = {verbose: console.log};
const dbFile = "./db/CashManagerDB.sqlite";
const dbConnection = new Database(dbFile, dbOptions);

const arbeitgeberDao = require("./dao/arbeitgeberDao");
const schichtDao = require("./dao/schichtDao");
const UserDao = require("./dao/userDao");


var daoA=new arbeitgeberDao(dbConnection);
var daoS=new schichtDao(dbConnection);
var daoU=new UserDao(dbConnection);


test('Verbindungstest', () => {
    expect(daoA.getConnection()).toBeTruthy();
  });

test('User check UserID = 1', () => {
  expect(daoU.loadById(3).id).toEqual(3);
})

test('Angemeldete Userzahl überprüfen = 3?',() => {
  expect(daoU.loadAll()).toHaveLength(3);
})

test('Schicht check Schicht(1) vorhanden?',() => {
  expect(daoS.exists(1)).toBeTruthy();
})

test('Stundenlohn bei Arbeitgeber Lidl = 12.5',() => {
  expect(daoA.loadById(3).stundenlohn).toEqual(12.5);
})

// FOREIGN KEY constraint test: darf nichtlöschbar sein -> notTure
test('delete test', () => {
  expect(daoA.delete(1)).not.toBeTruthy();
});

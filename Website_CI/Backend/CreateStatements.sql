CREATE TABLE User(
	ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	Benutzername TEXT NOT NULL UNIQUE,
	Vorname TEXT NOT NULL,
	Nachname TEXT NOT NULL,
	EMail TEXT NOT NULL,
	Passwort TEXT NOT NULL,
	Strasse TEXT NOT NULL,
	PLZ TEXT NOT NULL,
	Stadt TEXT NOT NULL
	);

CREATE TABLE Arbeitgeber (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    Name TEXT NOT NULL,
    Stundenlohn REAL NOT NULL,
	Strasse TEXT NOT NULL,
	PLZ TEXT NOT NULL,
	Stadt TEXT NOT NULL,
	CONSTRAINT fk_User1 FOREIGN KEY (UserID) REFERENCES User(ID)
);

CREATE TABLE Schicht (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    UserID INTEGER NOT NULL,
    ArbeitgeberID INTEGER NOT NULL,
    Bezeichnung TEXT NOT NULL,
    Datum TEXT NOT NULL,
    Startzeit TEXT NOT NULL,
    Endzeit TEXT NOT NULL,
    Verdient REAL NOT NULL,
    CONSTRAINT fk_User2 FOREIGN KEY (UserID) REFERENCES User(ID),
    CONSTRAINT fk_Schicht1 FOREIGN KEY (ArbeitgeberID) REFERENCES Arbeitgeber(ID)
);


INSERT INTO "User"
(Benutzername, Vorname, Nachname, EMail, Passwort, Strasse, PLZ, Stadt)
VALUES('da', 'da', 'ad', 'da', 'da', 'da', 'da', 'da');

select * from user where id =1;





Drop Table Verdienst ;
Drop Table User;
Drop Table Schicht;
Drop Table Arbeitgeber ;
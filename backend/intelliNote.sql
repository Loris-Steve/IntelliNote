DROP DATABASE IF EXISTS intelliNote;

CREATE DATABASE intelliNote ;

USE intelliNote;

CREATE TABLE users(
   idUser INT AUTO_INCREMENT,
   name VARCHAR(64) NOT NULL,
   email VARCHAR(124),
   password VARCHAR(150),
   PRIMARY KEY(idUser)
);

CREATE TABLE folders(
   idFolder INT AUTO_INCREMENT,
   name VARCHAR(64),
   id_Folder INT,
   id_User INT NOT NULL,
   PRIMARY KEY(idFolder),
   FOREIGN KEY(id_Folder) REFERENCES folders(idFolder),
   FOREIGN KEY(id_User) REFERENCES users(idUser)
   ON DELETE CASCADE
);

CREATE TABLE notes(
   idNote INT AUTO_INCREMENT,
   name VARCHAR(64) NOT NULL,
   content VARCHAR(200),
   pos INT NOT NULL,
   id_Folder INT NOT NULL,
   PRIMARY KEY(idNote),
   FOREIGN KEY(id_Folder) REFERENCES folders(idFolder)
   ON DELETE CASCADE
);

CREATE DEFINER=`root`@`localhost` TRIGGER `users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW BEGIN

	INSERT INTO folders SET name = `(default)` , id_User = new.idUser ;
	
END

/*
   Si counter ne fonctionne pas
   COUNTER --> INT(11) UNSIGNED AUTO_INCREMENT
1 warning(s) Integer display width is deprecaled and will be removed in a future release
*/
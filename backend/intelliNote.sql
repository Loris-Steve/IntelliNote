DROP DATABASE IF EXISTS intelliNote;

CREATE DATABASE intelliNote ;

USE intelliNote;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(124) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `idFolder` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `id_Folder` int(11) DEFAULT NULL,
  `id_User` int(11) NOT NULL,
  PRIMARY KEY (`idFolder`),
  KEY `id_User` (`id_User`),
  KEY `folders_ibfk_1` (`id_Folder`),
  CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`id_Folder`) REFERENCES `folders` (`idFolder`) ON DELETE CASCADE,
  CONSTRAINT `folders_ibfk_2` FOREIGN KEY (`id_User`) REFERENCES `users` (`idUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notes` (
  `idNote` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `pos` int(11) DEFAULT NULL,
  `id_Folder` int(11) NOT NULL,
  PRIMARY KEY (`idNote`),
  KEY `id_Folder` (`id_Folder`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`id_Folder`) REFERENCES `folders` (`idFolder`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

CREATE DEFINER=`root`@`localhost` TRIGGER `users_AFTER_INSERT` AFTER INSERT ON `users` FOR EACH ROW BEGIN

	INSERT INTO folders SET name = `(default)` , id_User = new.idUser ;
	
END

/*
   Si counter ne fonctionne pas
   COUNTER --> INT(11) UNSIGNED AUTO_INCREMENT
1 warning(s) Integer display width is deprecaled and will be removed in a future release
*/
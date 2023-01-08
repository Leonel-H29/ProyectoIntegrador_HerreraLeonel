-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: portafolio
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `educacion`
--

DROP TABLE IF EXISTS `educacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educacion` (
  `ideducacion` int NOT NULL AUTO_INCREMENT,
  `nombre_institucion` varchar(90) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `idpersona` bigint NOT NULL,
  PRIMARY KEY (`ideducacion`,`idpersona`),
  KEY `fk_educacion_persona1_idx` (`idpersona`),
  CONSTRAINT `fk_educacion_persona1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educacion`
--

LOCK TABLES `educacion` WRITE;
/*!40000 ALTER TABLE `educacion` DISABLE KEYS */;
INSERT INTO `educacion` VALUES (1,'UNIVERSIDAD NACIONAL DE TUCUMAN (UNT)','2018-03-11',NULL,'Licenciatura en informática',1),(2,'UNIVERSIDAD NACIONAL DE TUCUMAN (UNT)','2020-05-20',NULL,'Programador Universitario',1),(4,'sdfdsfsdf','2022-10-13','2022-10-15','sdfdsfs',2),(5,'vxdvdsvds','2022-10-12','2022-10-28','dvdsvdf',2),(6,'dasdasdxz534543','2022-10-04','2022-10-12','sdsadxczcxc',6),(7,'hrfthrthtrh','2012-09-26','2022-10-04','fdgdfg',8),(8,'INI Copmputacion','2022-10-04','2022-10-06','Reparación de PC',1),(9,'Prueba EDU','2022-09-28','2022-10-30','tEST',1),(10,'COLEGIO SAN CAYETANO','2004-03-06','2016-12-06','',1),(11,'Conservatorio de musica','2010-01-11','2010-06-03','',1);
/*!40000 ALTER TABLE `educacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia_laboral`
--

DROP TABLE IF EXISTS `experiencia_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencia_laboral` (
  `idexperiencia` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(90) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `idpersona` bigint NOT NULL,
  `idtipo_empleo` int NOT NULL,
  PRIMARY KEY (`idexperiencia`,`idpersona`,`idtipo_empleo`),
  KEY `fk_experiencia_laboral_persona_idx` (`idpersona`),
  KEY `fk_experiencia_laboral_tipo_empleo1_idx` (`idtipo_empleo`),
  CONSTRAINT `fk_experiencia_laboral_persona` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`),
  CONSTRAINT `fk_experiencia_laboral_tipo_empleo1` FOREIGN KEY (`idtipo_empleo`) REFERENCES `tipo_empleo` (`idtipo_empleo`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia_laboral`
--

LOCK TABLES `experiencia_laboral` WRITE;
/*!40000 ALTER TABLE `experiencia_laboral` DISABLE KEYS */;
INSERT INTO `experiencia_laboral` VALUES (1,'MINISTERIO DE EDUCACION','2022-02-11','2022-10-12','Administrador de sistemas',1,6),(5,'dsadas','2022-10-20','2022-10-29','dsadas',2,1),(6,'FC BARCELONA','1999-08-12','2021-08-11','',6,2),(7,'etrdtred','2022-10-03','2022-11-04','dfdgdf',8,1),(8,'Prueba 1','2022-10-05','2022-10-13','Agrego swal',1,2),(9,'Banda registrada','2000-01-26','2009-11-20','Banda de cuarteto',1,2),(10,'Nueva experiencia','2022-09-27','2022-10-30','test',1,6),(11,'Boca Juniors','2001-11-11','2004-12-22','',7,2),(12,'Desarrollador Freelancer','2022-12-06','2022-12-07','',1,2),(13,'Youtuber','2016-03-29','2017-12-22','',1,2);
/*!40000 ALTER TABLE `experiencia_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idpersona` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `apellido` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `profesion` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `provincia` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `pais` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `codigo_postal` smallint NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `telefono` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `foto_perfil_url` varchar(260) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `idusuario` bigint NOT NULL,
  PRIMARY KEY (`idpersona`,`idusuario`),
  UNIQUE KEY `idusuario` (`idusuario`),
  KEY `fk_persona_usuario1_idx` (`idusuario`),
  CONSTRAINT `fk_persona_usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Leonel Esteban','Herrera',NULL,'Tucuman','Argentina',4000,'1999-01-29','','Junior Developer on Java & Angular, +2 experience on Python & Django Rest Framework as Backend, Vue js as Frontend','https://pbs.twimg.com/profile_images/817566729354280961/eg8ysNUC_400x400.jpg',6),(2,'Aldo','Herrera',NULL,'Tucuman','Argentina',4000,'1994-02-24',NULL,'Soy profesor en informatica','https://firebasestorage.googleapis.com/v0/b/portafolio-argentina-programa.appspot.com/o/imagen%2Fperfil_2?alt=media&token=578f6f5e-4db1-449a-89d7-f76be0bc8293',5),(6,'Lionel','Messi',NULL,'Santa Fe','Argentina',4000,'2022-10-11','381212345','wdswda','https://firebasestorage.googleapis.com/v0/b/portafolio-argentina-programa.appspot.com/o/imagen%2Fperfil_6?alt=media&token=f09693eb-393a-463b-9eb6-f87bc236951e',13),(7,'CARLOS','TEVEZ',NULL,'Buenos Aires','Argentina',1222,'1983-02-12','381212345','---','https://firebasestorage.googleapis.com/v0/b/portafolio-argentina-programa.appspot.com/o/imagen%2Fperfil_7?alt=media&token=8188af78-4df5-4009-beb4-64b2e53bb714',14),(8,'Matias','Quiz',NULL,'Buenos Aires','Argentina',1334,'1993-09-26','381212345','adas','https://firebasestorage.googleapis.com/v0/b/portafolio-argentina-programa.appspot.com/o/imagen%2Fperfil_8?alt=media&token=ab4a05f4-3fc6-4850-b35d-b2f04abc62a7',15),(11,'Rodrigo','Bueno',NULL,'Cordoba','Argentina',1107,'1973-05-24','','Cantante','https://firebasestorage.googleapis.com/v0/b/portafolio-argentina-programa.appspot.com/o/imagen%2Fperfil_11?alt=media&token=8a713b5c-e919-49f6-a155-fee5683810e8',18),(12,'Ticiano','Torres Peralta',NULL,'Tucuman','Argentina',3999,'2022-12-16','','Profe de Arquitectura','https://www.facet.unt.edu.ar/dpto-cs-comp/wp-content/uploads/sites/29/2021/10/ttorresperalta.png',19),(13,'Lionel ','Scaloni',NULL,'Santa Fe','Argentina',2222,'1976-12-12','','DT SELECCION ARGENTINA','',20),(14,'Rodrigo','Tapari',NULL,'Buenos Aires','Argentina',2222,'1988-01-12','','...','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/M7FO77BFAZCWJLYPSCZU7RE7UU.jpg',21),(15,'Angela','Leiva',NULL,'Buenos Aires','Argentina',2222,'1988-09-11','','...','https://www.cronica.com.ar/__export/1645899516909/sites/cronica/img/2022/02/26/angela_leiva_la_1_5_18_novela_polka_gina_gonzalo_heredia_cancixn_amor_prohibido_5_x1x_1_crop1645898809751.jpg_1354029428.jpg',22),(16,'Sebastian','Mendoza','Cantante','Buenos Aires','Argentina',4000,'1988-11-28','','....','',23),(17,'Daniel','Cardozo',NULL,'Buenos Aires','Argentina',2344,'1977-11-28','381212345','....','',24),(18,'Daniel','Agostini','Cantante','Buenos Aires','Argentina',1111,'1977-08-09','','...','',25);
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `idproyecto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `url_proyecto` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `idpersona` bigint NOT NULL,
  PRIMARY KEY (`idproyecto`,`idpersona`),
  KEY `fk_proyectos_persona1_idx` (`idpersona`),
  CONSTRAINT `fk_proyectos_persona1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'SISTEMA DE PORTAFOLIOS','PROYECTO FINAL DEL PROGRAMA #YOPROGRAMO 2022','2022-07-07',NULL,NULL,1),(2,'CADETERIA','Proyecto de taller 2','2021-08-11','2021-12-11',NULL,1),(3,'TWS','...','2022-07-07',NULL,NULL,1),(4,'Proposiciones','MERGE','2022-10-04','2022-10-27','http://localhost:4200/editproy/1/4',1),(6,'test','sdsadasd','2022-10-05','2022-10-29','sadd',2),(7,'GDFGDF','FDGDFG','2022-10-11','2022-10-15','',6),(9,'sadsd','sadsad','2022-10-05','2022-10-20','',8),(10,'New project','test de la edicion del dato','2022-09-27','2022-10-30','http://localhost:4200/createproy/1',1),(11,'DT','','2022-06-13','2022-12-21','',7),(12,'Portafolio','....','2022-12-07','2022-12-25','http://localhost:4200/createproy/1',1),(13,'Pasion canta','Concurso de canto','2008-03-07','2009-01-03','',15);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `redes`
--

DROP TABLE IF EXISTS `redes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `redes` (
  `idred` int NOT NULL AUTO_INCREMENT,
  `red` varchar(45) COLLATE utf8mb3_bin NOT NULL,
  `idpersona` bigint NOT NULL,
  `url_red` varchar(260) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`idred`,`idpersona`),
  KEY `_idx` (`idpersona`),
  CONSTRAINT `FKqx29p3tg50054ux2dhvm16foa` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `redes`
--

LOCK TABLES `redes` WRITE;
/*!40000 ALTER TABLE `redes` DISABLE KEYS */;
INSERT INTO `redes` VALUES (2,'Facebook',1,'http://localhost:4200/editredes/2'),(3,'Facebook',2,NULL),(4,'Facebook',6,NULL),(5,'Facebook',7,NULL),(6,'Facebook',8,NULL),(7,'Facebook',11,NULL),(8,'Instagram',7,NULL),(9,'Instagram',1,'http://localhost:4200/editredes/1'),(10,'Instagram',2,NULL),(11,'Instagram',6,NULL),(12,'Instagram',8,NULL),(13,'Instagram',11,NULL),(14,'Twitter',1,'http://localhost:4200/editredes/1'),(15,'Twitter',2,NULL),(16,'Twitter',6,NULL),(17,'Twitter',7,NULL),(18,'Twitter',8,NULL),(19,'Twitter',11,NULL),(20,'Linkedin',1,''),(21,'Linkedin',2,NULL),(22,'Linkedin',6,NULL),(23,'Linkedin',7,NULL),(24,'Linkedin',8,NULL),(25,'Linkedin',11,NULL),(26,'GitHub',1,''),(27,'GitHub',2,NULL),(28,'GitHub',6,NULL),(29,'GitHub',7,NULL),(30,'GitHub',8,NULL),(31,'GitHub',11,NULL),(32,'Facebook',12,NULL),(33,'Instagram',12,NULL),(34,'Twitter',12,NULL),(35,'Linkedin',12,NULL),(36,'GitHub',12,NULL),(37,'Facebook',13,NULL),(38,'Instagram',13,NULL),(39,'Twitter',13,NULL),(40,'Linkedin',13,NULL),(41,'GitHub',13,NULL),(42,'Facebook',14,NULL),(43,'Instagram',14,NULL),(44,'Twitter',14,NULL),(45,'Linkedin',14,NULL),(46,'GitHub',14,NULL),(47,'Facebook',15,'https://www.facebook.com/AngelaLeivaOk/'),(48,'Instagram',15,'https://www.instagram.com/angelaleivaok/'),(49,'Twitter',15,'https://mobile.twitter.com/angelaleivaok'),(50,'Linkedin',15,NULL),(51,'GitHub',15,''),(52,'Facebook',16,NULL),(53,'Instagram',16,NULL),(54,'Twitter',16,NULL),(55,'Linkedin',16,NULL),(56,'GitHub',16,NULL),(57,'Facebook',17,NULL),(58,'Instagram',17,NULL),(59,'Twitter',17,NULL),(60,'Linkedin',17,NULL),(61,'GitHub',17,NULL),(62,'Facebook',18,NULL),(63,'Instagram',18,NULL),(64,'Twitter',18,NULL),(65,'Linkedin',18,NULL),(66,'GitHub',18,NULL);
/*!40000 ALTER TABLE `redes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idrol` int NOT NULL AUTO_INCREMENT,
  `rol_nombre` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`idrol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (3,'ROLE_ADMIN'),(4,'ROLE_USER');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `idskill` int NOT NULL AUTO_INCREMENT,
  `skill` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `porcentaje` int NOT NULL,
  `idpersona` bigint NOT NULL,
  PRIMARY KEY (`idskill`,`idpersona`),
  KEY `fk_skills_persona1_idx` (`idpersona`),
  CONSTRAINT `fk_skills_persona1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'Python',40,1),(2,'C++/C#',40,1),(3,'Java',22,1),(4,'Angular Js',10,1),(5,'Vue js',60,1),(6,'Prolog ',20,1),(8,'Python',12,2),(10,'54ew5',2,8),(11,'Haskell',8,1),(12,'Cambios',20,13),(13,'Docker',50,1),(14,'Debian',32,1),(15,'Typescript',40,1);
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_empleo`
--

DROP TABLE IF EXISTS `tipo_empleo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_empleo` (
  `idtipo_empleo` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipo_empleo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_empleo`
--

LOCK TABLES `tipo_empleo` WRITE;
/*!40000 ALTER TABLE `tipo_empleo` DISABLE KEYS */;
INSERT INTO `tipo_empleo` VALUES (1,'FULL TIME HIBRIDO'),(2,'FULL TIME PRESENCIAL'),(3,'FULL TIME REMOTO'),(4,'PART TIME HIBRIDO'),(5,'PART TIME PRESENCIAL'),(6,'PART TIME REMOTO');
/*!40000 ALTER TABLE `tipo_empleo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `correo` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','admin','admin@admin.com'),(5,'alditodk','$2a$10$miV5J/rjw3gpVIsieW/ioO/fIZYxiVvbEZvvvmUlpzj8WAzxRPw6q','aldito@gmail.com'),(6,'leoneldkno29','$2a$10$8iGGMupDquQCJZ0R7Uhaq.32qeMDleo0dGxxo5wxG8W3JsWUF.GGW','leonelherreradkno@gmail.com'),(13,'leomessi10','$2a$10$fBc2XKxGjXd82PK3kS5Td.jM9lkj1jQCcnTBwjjkyktUN2qaLKukq','liomessi@gmail.com'),(14,'carlostevez1032','$2a$10$9W2.D6lCBFZy9CUrbYK.Fe3mR0HxNwJhVinQWXvf5ZoCzY7MckjRW','carlos_tevez32@gmail.com'),(15,'matu_q','$2a$10$lWmw24O.MV3YRgrnLyqg0.nH1ZabDJAa4qf2dCsCUQPIgEadpbkxS','matu_q@gmail.com'),(18,'elpotrorodrigo','$2a$10$Lva28yRrbrb3wCLQtCtTdOouDWAqT8tTTIsb64zeZ2sbQcUVu.V4y','elpotrorodrigo@hotmail.com'),(19,'ttorres','$2a$10$.OqiwWZakH7rAGr3xVDMh.WhAdprOYTxlF/yeq5acWgpeI886kUdG','ttorres@herrera.unt.edu.ar'),(20,'lioscaloni','$2a$10$tQ6yGx11772Zc4eywNfUW.8OgZrY/F3H25ygVwgPpQrHxU37V0qY6','scaloneta@gmail.com'),(21,'rotapari','$2a$10$evaOvaSiN4lNQPcE.R7MH.6W.YDxC47kmvvmm74kkQHcHi0qHCFkO','rotapari@gmail.com'),(22,'aleiva','$2a$10$hsLOFhSgBtGX4LgEduAOdePtDCtQ.rclCkWeIL8pt7hnKm5AwBqES','aleiva@gmail.com'),(23,'sebamendoza','$2a$10$Klqrovv/rZu53WdvQpMjmusD.Ll.Z9J2cb4f1lB9V431ifSYAOTki','sebamendoza@gmail.com'),(24,'danicardozo','$2a$10$SKEVIEW6iMBFB4MDS6nQAeYNuWlhvLzzJ.aq/r4IJdH5wrZiLCF1a','danicardozo@hotmail.com'),(25,'daniagostini','$2a$10$qWSdRGTTUHfjjRKIOPgf4uLIB4zRlfdwmbTZJ85W4ihix5TYOsEIG','daniagostini@gmail.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_rol`
--

DROP TABLE IF EXISTS `usuario_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_rol` (
  `idusuario` bigint NOT NULL,
  `idrol` int NOT NULL,
  PRIMARY KEY (`idusuario`,`idrol`),
  KEY `FK772rw294omyd1mwl1b8wkf0yh` (`idrol`),
  KEY `fk_usuario_rol_usuario1_idx` (`idusuario`),
  CONSTRAINT `FK772rw294omyd1mwl1b8wkf0yh` FOREIGN KEY (`idrol`) REFERENCES `rol` (`idrol`),
  CONSTRAINT `fk_usuario_rol_usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_rol`
--

LOCK TABLES `usuario_rol` WRITE;
/*!40000 ALTER TABLE `usuario_rol` DISABLE KEYS */;
INSERT INTO `usuario_rol` VALUES (1,3),(5,4),(6,4),(13,4),(14,4),(15,4),(18,4),(19,4),(20,4),(21,4),(22,4),(23,4),(24,4),(25,4);
/*!40000 ALTER TABLE `usuario_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-30 16:04:49

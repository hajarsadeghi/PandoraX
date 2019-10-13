-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: pandora_x
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add association',7,'add_association'),(26,'Can change association',7,'change_association'),(27,'Can delete association',7,'delete_association'),(28,'Can view association',7,'view_association'),(29,'Can add code',8,'add_code'),(30,'Can change code',8,'change_code'),(31,'Can delete code',8,'delete_code'),(32,'Can view code',8,'view_code'),(33,'Can add nonce',9,'add_nonce'),(34,'Can change nonce',9,'change_nonce'),(35,'Can delete nonce',9,'delete_nonce'),(36,'Can view nonce',9,'view_nonce'),(37,'Can add user social auth',10,'add_usersocialauth'),(38,'Can change user social auth',10,'change_usersocialauth'),(39,'Can delete user social auth',10,'delete_usersocialauth'),(40,'Can view user social auth',10,'view_usersocialauth'),(41,'Can add partial',11,'add_partial'),(42,'Can change partial',11,'change_partial'),(43,'Can delete partial',11,'delete_partial'),(44,'Can view partial',11,'view_partial'),(45,'Can add space',12,'add_space'),(46,'Can change space',12,'change_space'),(47,'Can delete space',12,'delete_space'),(48,'Can view space',12,'view_space'),(49,'Can add member',13,'add_member'),(50,'Can change member',13,'change_member'),(51,'Can delete member',13,'delete_member'),(52,'Can view member',13,'view_member'),(53,'Can add industry',14,'add_industry'),(54,'Can change industry',14,'change_industry'),(55,'Can delete industry',14,'delete_industry'),(56,'Can view industry',14,'view_industry'),(57,'Can add budget',15,'add_budget'),(58,'Can change budget',15,'change_budget'),(59,'Can delete budget',15,'delete_budget'),(60,'Can view budget',15,'view_budget'),(61,'Can add icon',16,'add_icon'),(62,'Can change icon',16,'change_icon'),(63,'Can delete icon',16,'delete_icon'),(64,'Can view icon',16,'view_icon'),(65,'Can add badge',17,'add_badge'),(66,'Can change badge',17,'change_badge'),(67,'Can delete badge',17,'delete_badge'),(68,'Can view badge',17,'view_badge'),(69,'Can add transaction',18,'add_transaction'),(70,'Can change transaction',18,'change_transaction'),(71,'Can delete transaction',18,'delete_transaction'),(72,'Can view transaction',18,'view_transaction');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badge_badge`
--

DROP TABLE IF EXISTS `badge_badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badge_badge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `point_amount` int(10) unsigned NOT NULL,
  `description` longtext,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `icon_id` int(11) NOT NULL,
  `space_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `badge_badge_creator_id_b7ca960b_fk_user_user_id` (`creator_id`),
  KEY `badge_badge_icon_id_4f0f1374_fk_badge_icon_id` (`icon_id`),
  KEY `badge_badge_space_id_aa07b5c6_fk_space_space_id` (`space_id`),
  CONSTRAINT `badge_badge_creator_id_b7ca960b_fk_user_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `badge_badge_icon_id_4f0f1374_fk_badge_icon_id` FOREIGN KEY (`icon_id`) REFERENCES `badge_icon` (`id`),
  CONSTRAINT `badge_badge_space_id_aa07b5c6_fk_space_space_id` FOREIGN KEY (`space_id`) REFERENCES `space_space` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge_badge`
--

LOCK TABLES `badge_badge` WRITE;
/*!40000 ALTER TABLE `badge_badge` DISABLE KEYS */;
INSERT INTO `badge_badge` VALUES (16,'Number One',100,'first person in a specific activity in a team',1,'2019-10-09 10:13:39.317562',2,62,15),(17,'number two',75,'the second best in a team for an activity',1,'2019-10-09 10:14:52.138068',2,63,15),(18,'Number Three',50,'the third best in a team for a specific task',1,'2019-10-09 10:17:08.460268',2,64,15),(19,'Hero',500,'Someone who saves the company in a difficult time in a specific task',1,'2019-10-09 10:18:16.662240',2,65,15),(20,'Collaboration',50,'The best people in a team who work best together',1,'2019-10-09 10:21:00.993743',2,66,15),(21,'Out of the box thinker',100,'someone who manages a problem by finding rare solutions',1,'2019-10-09 10:22:52.683873',2,67,15),(22,'gold medal',1000,'the most productive person in a company',1,'2019-10-09 10:23:54.215714',2,68,15),(23,'achiever',200,'someone who achieves something',1,'2019-10-09 10:29:16.181997',2,69,15),(24,'spotter',40,'someone who spots important details in a discussion',1,'2019-10-09 10:32:59.504356',2,70,15),(25,'Good Manners',40,'someone who has the best working manners in the company',1,'2019-10-09 10:34:47.131457',2,71,15),(26,'Prize winner',200,'someone who has won a prize for the company',1,'2019-10-09 10:35:44.794665',2,72,15),(27,'Team player',50,'someone that people can work with very comfortably ',1,'2019-10-09 10:38:33.735714',2,73,15),(28,'Good Job',40,'someone who has done a nice job',1,'2019-10-09 10:40:33.327658',2,74,15),(29,'finisher',800,'someone who finishes a project',1,'2019-10-09 10:43:08.142325',2,75,15),(30,'founder',300,'someone who is the founder of something important',1,'2019-10-09 10:46:54.588786',2,76,15),(31,'well done',20,'like what you did',1,'2019-10-09 11:02:49.921443',2,77,15),(32,'happy birthday',60,'say happy birthday to someone',1,'2019-10-09 11:04:29.374079',2,78,15),(33,'badge of honor',200,'honor someone with this badge',1,'2019-10-09 11:08:22.634235',2,79,15),(34,'Best Leader',400,'choose the best leader in a team',1,'2019-10-09 11:09:31.687176',2,80,15),(35,'candy',10,'give a away candy for something you bought recently',1,'2019-10-09 11:10:50.286547',2,81,15),(36,'hard worker',50,'someone who dedicates himself/herself to what they do',1,'2019-10-09 11:37:35.689605',2,85,15),(37,'celebration',30,'I\'m celebrating with you',1,'2019-10-09 11:40:20.102013',2,86,15),(38,'Happy Graduation',70,'celebrate with someone who has recently graduated',1,'2019-10-09 11:41:03.880171',2,87,15),(39,'to infinity and beyond ',120,'someone who puts themselves far from company\'s scope for the sake of the company',1,'2019-10-09 11:42:31.655000',2,88,15),(40,'Popular',2000,'Someone who has made the company popular',1,'2019-10-09 11:44:27.928067',2,89,15);
/*!40000 ALTER TABLE `badge_badge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badge_icon`
--

DROP TABLE IF EXISTS `badge_icon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `badge_icon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  `space_id` int(11) DEFAULT NULL,
  `is_global` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `badge_icon_creator_id_8e8b66b6_fk_user_user_id` (`creator_id`),
  KEY `badge_icon_space_id_7b6f54df_fk_space_space_id` (`space_id`),
  CONSTRAINT `badge_icon_creator_id_8e8b66b6_fk_user_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `badge_icon_space_id_7b6f54df_fk_space_space_id` FOREIGN KEY (`space_id`) REFERENCES `space_space` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge_icon`
--

LOCK TABLES `badge_icon` WRITE;
/*!40000 ALTER TABLE `badge_icon` DISABLE KEYS */;
INSERT INTO `badge_icon` VALUES (62,'badge_icons/b1_eHHI3WR.svg',1,'2019-10-09 10:09:50.767886',2,15,1),(63,'badge_icons/b2_SRdlvJ6.svg',1,'2019-10-09 10:14:48.754200',2,15,1),(64,'badge_icons/b3_hIzpzYf.svg',1,'2019-10-09 10:17:06.365598',2,15,1),(65,'badge_icons/b4_X7nHV4N.svg',1,'2019-10-09 10:18:14.623433',2,15,1),(66,'badge_icons/b5_aPNHMpU.svg',1,'2019-10-09 10:20:58.818617',2,15,1),(67,'badge_icons/b6_FxwgJuW.svg',1,'2019-10-09 10:22:50.104684',2,15,1),(68,'badge_icons/b7_9xLb1Bp.svg',1,'2019-10-09 10:23:52.367367',2,15,1),(69,'badge_icons/b8_U10bYHz.svg',1,'2019-10-09 10:29:14.295764',2,15,1),(70,'badge_icons/b9_5hrF0wC.svg',1,'2019-10-09 10:32:57.634122',2,15,1),(71,'badge_icons/b10_sFgTXLR.svg',1,'2019-10-09 10:34:45.068440',2,15,1),(72,'badge_icons/b11_cTfDwzf.svg',1,'2019-10-09 10:35:42.593837',2,15,1),(73,'badge_icons/b12_I6J1OoO.svg',1,'2019-10-09 10:38:32.090097',2,15,1),(74,'badge_icons/b13_8PsQKNY.svg',1,'2019-10-09 10:40:31.501753',2,15,1),(75,'badge_icons/b14_oAcz9k2.svg',1,'2019-10-09 10:43:06.162046',2,15,1),(76,'badge_icons/b15_YF82nQz.svg',1,'2019-10-09 10:46:53.289785',2,15,1),(77,'badge_icons/b16_vu6bMZP.svg',1,'2019-10-09 11:02:48.495826',2,15,1),(78,'badge_icons/b17_Ar0xI49.svg',1,'2019-10-09 11:04:27.800009',2,15,1),(79,'badge_icons/b18_jkr7KSD.svg',1,'2019-10-09 11:08:21.240781',2,15,1),(80,'badge_icons/b19_c3iMMLE.svg',1,'2019-10-09 11:09:29.125909',2,15,1),(81,'badge_icons/b20_AvZKxTj.svg',1,'2019-10-09 11:10:48.685511',2,15,1),(85,'badge_icons/b21_wg7Cx5e.svg',1,'2019-10-09 11:32:34.814340',2,15,1),(86,'badge_icons/b22_1Rbck9b.svg',1,'2019-10-09 11:32:45.981289',2,15,1),(87,'badge_icons/b23_fqwl3gk.svg',1,'2019-10-09 11:33:09.001413',2,15,1),(88,'badge_icons/b24_bG6PCrb.svg',1,'2019-10-09 11:33:23.564413',2,15,1),(89,'badge_icons/b25_1fngiKH.svg',1,'2019-10-09 11:33:44.285488',2,15,1),(90,'badge_icons/b26_dUq6z1f.svg',1,'2019-10-09 11:34:29.061732',2,15,1),(91,'badge_icons/b27_hzqGv1v.svg',1,'2019-10-09 11:35:05.474461',2,15,1),(92,'badge_icons/b28_J9B9XNG.svg',1,'2019-10-09 11:35:56.146841',2,15,1),(93,'badge_icons/b29_YaXjd2Z.svg',1,'2019-10-09 11:36:24.851072',2,15,1),(94,'badge_icons/b30_DcGhYYU.svg',1,'2019-10-09 11:36:36.142487',2,15,1);
/*!40000 ALTER TABLE `badge_icon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget_budget`
--

DROP TABLE IF EXISTS `budget_budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `budget_budget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `point_amount` int(10) unsigned NOT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `space_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `budget_budget_creator_id_9bd111e4_fk_user_user_id` (`creator_id`),
  KEY `budget_budget_space_id_f80df30d_fk_space_space_id` (`space_id`),
  CONSTRAINT `budget_budget_creator_id_9bd111e4_fk_user_user_id` FOREIGN KEY (`creator_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `budget_budget_space_id_f80df30d_fk_space_space_id` FOREIGN KEY (`space_id`) REFERENCES `space_space` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget_budget`
--

LOCK TABLES `budget_budget` WRITE;
/*!40000 ALTER TABLE `budget_budget` DISABLE KEYS */;
/*!40000 ALTER TABLE `budget_budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2019-08-10 14:02:18.520948','1','HajarSadeghi',3,'',10,2),(2,'2019-08-14 08:18:17.199553','1','software',1,'[{\"added\": {}}]',14,2),(3,'2019-08-14 08:18:30.109674','2','legal',1,'[{\"added\": {}}]',14,2),(4,'2019-08-14 08:18:36.037966','3','health',1,'[{\"added\": {}}]',14,2),(5,'2019-08-14 08:18:50.609197','4','hardware',1,'[{\"added\": {}}]',14,2),(6,'2019-08-14 08:19:00.423813','5','restaurant',1,'[{\"added\": {}}]',14,2),(7,'2019-08-14 08:19:20.033734','6','insurance',1,'[{\"added\": {}}]',14,2),(8,'2019-08-14 11:19:08.198847','14','afdasf',3,'',12,2),(9,'2019-08-14 11:19:08.203684','13','dsfsfd',3,'',12,2),(10,'2019-08-14 11:19:08.206059','12','sfsf',3,'',12,2),(11,'2019-08-14 11:19:08.208060','11','ttt',3,'',12,2),(12,'2019-08-14 11:19:08.209317','10','erwer',3,'',12,2),(13,'2019-08-14 11:19:08.210524','9','sfsdf',3,'',12,2),(14,'2019-08-14 11:19:08.212424','8','arianalabs2',3,'',12,2),(15,'2019-08-14 11:19:08.213794','7','test2',3,'',12,2),(16,'2019-08-14 11:19:08.215018','6','test',3,'',12,2),(17,'2019-08-14 11:19:08.216186','5','food',3,'',12,2),(18,'2019-08-14 11:19:08.217222','4','snappfood',3,'',12,2),(19,'2019-08-14 11:19:08.218407','3','SNAPP',3,'',12,2),(20,'2019-08-14 11:19:08.219505','2','ariana',3,'',12,2),(21,'2019-08-14 11:19:08.220474','1','arianalabs',3,'',12,2),(22,'2019-08-19 06:33:15.368193','2','GHH HJJLL HHLLLJKKWER@@@@KLDF',3,'',12,2),(23,'2019-09-22 12:47:04.707638','1','Icon object (1)',2,'[{\"changed\": {\"fields\": [\"is_global\"]}}]',16,2),(24,'2019-09-22 12:47:32.248743','14','Icon object (14)',3,'',16,2),(25,'2019-09-22 12:47:32.251253','13','Icon object (13)',3,'',16,2),(26,'2019-09-22 12:47:32.252496','12','Icon object (12)',3,'',16,2),(27,'2019-09-22 12:47:32.255889','11','Icon object (11)',3,'',16,2),(28,'2019-09-22 12:47:32.257755','10','Icon object (10)',3,'',16,2),(29,'2019-09-22 12:47:32.259095','9','Icon object (9)',3,'',16,2),(30,'2019-09-22 12:47:32.260439','8','Icon object (8)',3,'',16,2),(31,'2019-09-22 12:47:32.261887','7','Icon object (7)',3,'',16,2),(32,'2019-09-22 12:47:32.263552','6','Icon object (6)',3,'',16,2),(33,'2019-09-22 12:47:32.265880','5','Icon object (5)',3,'',16,2),(34,'2019-09-22 12:47:32.267267','4','Icon object (4)',3,'',16,2),(35,'2019-09-22 12:47:32.268559','3','Icon object (3)',3,'',16,2),(36,'2019-09-22 12:47:32.270043','2','Icon object (2)',3,'',16,2),(37,'2019-09-22 12:47:32.271229','1','Icon object (1)',3,'',16,2),(38,'2019-09-22 12:56:50.099627','15','Icon object (15)',1,'[{\"added\": {}}]',16,2),(39,'2019-09-22 12:57:41.742713','16','Icon object (16)',1,'[{\"added\": {}}]',16,2),(40,'2019-09-22 12:57:48.578465','17','Icon object (17)',1,'[{\"added\": {}}]',16,2),(41,'2019-09-22 12:57:57.983461','18','Icon object (18)',1,'[{\"added\": {}}]',16,2),(42,'2019-09-22 12:58:10.071010','19','Icon object (19)',1,'[{\"added\": {}}]',16,2),(43,'2019-09-22 12:58:28.668336','15','Icon object (15)',3,'',16,2),(44,'2019-09-22 12:58:48.378856','20','Icon object (20)',1,'[{\"added\": {}}]',16,2),(45,'2019-09-22 12:59:02.049819','21','Icon object (21)',1,'[{\"added\": {}}]',16,2),(46,'2019-09-22 12:59:54.548551','21','Icon object (21)',3,'',16,2),(47,'2019-09-22 12:59:54.551280','20','Icon object (20)',3,'',16,2),(48,'2019-09-22 12:59:54.553341','19','Icon object (19)',3,'',16,2),(49,'2019-09-22 12:59:54.554543','18','Icon object (18)',3,'',16,2),(50,'2019-09-22 12:59:54.555726','17','Icon object (17)',3,'',16,2),(51,'2019-09-22 12:59:54.557732','16','Icon object (16)',3,'',16,2),(52,'2019-09-22 13:00:03.793737','22','Icon object (22)',1,'[{\"added\": {}}]',16,2),(53,'2019-09-22 13:00:12.720911','23','Icon object (23)',1,'[{\"added\": {}}]',16,2),(54,'2019-09-22 13:00:20.650677','24','Icon object (24)',1,'[{\"added\": {}}]',16,2),(55,'2019-09-22 13:00:28.403285','25','Icon object (25)',1,'[{\"added\": {}}]',16,2),(56,'2019-09-22 13:00:36.769199','26','Icon object (26)',1,'[{\"added\": {}}]',16,2),(57,'2019-09-22 13:00:43.898825','27','Icon object (27)',1,'[{\"added\": {}}]',16,2),(58,'2019-09-22 13:00:51.983165','28','Icon object (28)',1,'[{\"added\": {}}]',16,2),(59,'2019-09-22 13:00:58.846668','29','Icon object (29)',1,'[{\"added\": {}}]',16,2),(60,'2019-09-22 13:01:08.509777','30','Icon object (30)',1,'[{\"added\": {}}]',16,2),(61,'2019-09-22 13:01:26.767423','31','Icon object (31)',1,'[{\"added\": {}}]',16,2),(62,'2019-09-22 13:01:33.714452','32','Icon object (32)',1,'[{\"added\": {}}]',16,2),(63,'2019-09-22 13:01:39.968210','33','Icon object (33)',1,'[{\"added\": {}}]',16,2),(64,'2019-09-22 13:01:47.389279','34','Icon object (34)',1,'[{\"added\": {}}]',16,2),(65,'2019-09-22 13:01:53.484446','35','Icon object (35)',1,'[{\"added\": {}}]',16,2),(66,'2019-09-22 13:01:59.933940','36','Icon object (36)',1,'[{\"added\": {}}]',16,2),(67,'2019-09-22 13:02:06.571982','37','Icon object (37)',1,'[{\"added\": {}}]',16,2),(68,'2019-09-22 13:02:13.192133','38','Icon object (38)',1,'[{\"added\": {}}]',16,2),(69,'2019-09-22 13:02:23.288721','39','Icon object (39)',1,'[{\"added\": {}}]',16,2),(70,'2019-09-22 13:03:02.242566','40','Icon object (40)',1,'[{\"added\": {}}]',16,2),(71,'2019-09-22 13:03:09.300664','41','Icon object (41)',1,'[{\"added\": {}}]',16,2),(72,'2019-09-22 13:03:15.149138','42','Icon object (42)',1,'[{\"added\": {}}]',16,2),(73,'2019-09-22 13:03:21.862520','43','Icon object (43)',1,'[{\"added\": {}}]',16,2),(74,'2019-09-22 13:03:29.202352','44','Icon object (44)',1,'[{\"added\": {}}]',16,2),(75,'2019-09-22 13:03:37.552021','45','Icon object (45)',1,'[{\"added\": {}}]',16,2),(76,'2019-09-22 13:03:44.937978','46','Icon object (46)',1,'[{\"added\": {}}]',16,2),(77,'2019-09-22 13:03:52.085233','47','Icon object (47)',1,'[{\"added\": {}}]',16,2),(78,'2019-09-22 13:03:58.896121','48','Icon object (48)',1,'[{\"added\": {}}]',16,2),(79,'2019-09-22 13:04:17.725131','49','Icon object (49)',1,'[{\"added\": {}}]',16,2),(80,'2019-09-22 13:04:25.799312','50','Icon object (50)',1,'[{\"added\": {}}]',16,2),(81,'2019-09-22 13:04:33.827330','51','Icon object (51)',1,'[{\"added\": {}}]',16,2),(82,'2019-09-23 11:11:29.536088','60','Icon object (60)',3,'',16,2),(83,'2019-09-23 11:11:29.538751','59','Icon object (59)',3,'',16,2),(84,'2019-09-23 11:11:29.540102','58','Icon object (58)',3,'',16,2),(85,'2019-09-23 11:11:29.541275','57','Icon object (57)',3,'',16,2),(86,'2019-09-23 11:11:29.542594','56','Icon object (56)',3,'',16,2),(87,'2019-09-23 11:11:29.544580','55','Icon object (55)',3,'',16,2),(88,'2019-09-23 11:11:29.545892','54','Icon object (54)',3,'',16,2),(89,'2019-09-23 11:11:29.547350','53','Icon object (53)',3,'',16,2),(90,'2019-09-23 11:11:29.548509','52','Icon object (52)',3,'',16,2),(91,'2019-09-23 11:11:53.762887','2','Badge object (2)',3,'',17,2),(92,'2019-10-09 09:46:55.805239','15','Badge object (15)',3,'',17,2),(93,'2019-10-09 09:46:55.807367','14','Badge object (14)',3,'',17,2),(94,'2019-10-09 09:46:55.808405','13','Badge object (13)',3,'',17,2),(95,'2019-10-09 09:46:55.809224','12','Badge object (12)',3,'',17,2),(96,'2019-10-09 09:46:55.810070','11','Badge object (11)',3,'',17,2),(97,'2019-10-09 09:46:55.810942','10','Badge object (10)',3,'',17,2),(98,'2019-10-09 09:46:55.811802','9','Badge object (9)',3,'',17,2),(99,'2019-10-09 09:46:55.812659','8','Badge object (8)',3,'',17,2),(100,'2019-10-09 09:46:55.813531','7','Badge object (7)',3,'',17,2),(101,'2019-10-09 09:46:55.814535','6','Badge object (6)',3,'',17,2),(102,'2019-10-09 09:46:55.815555','5','Badge object (5)',3,'',17,2),(103,'2019-10-09 09:46:55.816529','4','Badge object (4)',3,'',17,2),(104,'2019-10-09 09:46:55.817554','3','Badge object (3)',3,'',17,2),(105,'2019-10-09 09:47:08.488014','61','Icon object (61)',3,'',16,2),(106,'2019-10-09 09:47:08.490802','51','Icon object (51)',3,'',16,2),(107,'2019-10-09 09:47:08.492155','50','Icon object (50)',3,'',16,2),(108,'2019-10-09 09:47:08.493334','49','Icon object (49)',3,'',16,2),(109,'2019-10-09 09:47:08.494449','48','Icon object (48)',3,'',16,2),(110,'2019-10-09 09:47:08.495824','47','Icon object (47)',3,'',16,2),(111,'2019-10-09 09:47:08.497905','46','Icon object (46)',3,'',16,2),(112,'2019-10-09 09:47:08.498982','45','Icon object (45)',3,'',16,2),(113,'2019-10-09 09:47:08.500140','44','Icon object (44)',3,'',16,2),(114,'2019-10-09 09:47:08.501390','43','Icon object (43)',3,'',16,2),(115,'2019-10-09 09:47:08.502537','42','Icon object (42)',3,'',16,2),(116,'2019-10-09 09:47:08.503597','41','Icon object (41)',3,'',16,2),(117,'2019-10-09 09:47:08.504874','40','Icon object (40)',3,'',16,2),(118,'2019-10-09 09:47:08.507851','39','Icon object (39)',3,'',16,2),(119,'2019-10-09 09:47:08.508810','38','Icon object (38)',3,'',16,2),(120,'2019-10-09 09:47:08.509743','37','Icon object (37)',3,'',16,2),(121,'2019-10-09 09:47:08.510607','36','Icon object (36)',3,'',16,2),(122,'2019-10-09 09:47:08.511483','35','Icon object (35)',3,'',16,2),(123,'2019-10-09 09:47:08.512374','34','Icon object (34)',3,'',16,2),(124,'2019-10-09 09:47:08.513529','33','Icon object (33)',3,'',16,2),(125,'2019-10-09 09:47:08.514598','32','Icon object (32)',3,'',16,2),(126,'2019-10-09 09:47:08.515553','31','Icon object (31)',3,'',16,2),(127,'2019-10-09 09:47:08.517319','30','Icon object (30)',3,'',16,2),(128,'2019-10-09 09:47:08.518203','29','Icon object (29)',3,'',16,2),(129,'2019-10-09 09:47:08.519041','28','Icon object (28)',3,'',16,2),(130,'2019-10-09 09:47:08.519853','27','Icon object (27)',3,'',16,2),(131,'2019-10-09 09:47:08.520679','26','Icon object (26)',3,'',16,2),(132,'2019-10-09 09:47:08.521496','25','Icon object (25)',3,'',16,2),(133,'2019-10-09 09:47:08.522254','24','Icon object (24)',3,'',16,2),(134,'2019-10-09 09:47:08.523027','23','Icon object (23)',3,'',16,2),(135,'2019-10-09 09:47:08.523803','22','Icon object (22)',3,'',16,2),(136,'2019-10-09 09:47:17.846219','2','Budget object (2)',3,'',15,2),(137,'2019-10-09 09:47:17.848935','1','Budget object (1)',3,'',15,2),(138,'2019-10-09 09:48:36.997949','14','other',3,'',12,2),(139,'2019-10-09 09:48:37.000878','13','othertest',3,'',12,2),(140,'2019-10-09 09:48:37.003099','12','testtest',3,'',12,2),(141,'2019-10-09 09:48:37.004240','11','wednesday',3,'',12,2),(142,'2019-10-09 09:48:37.005335','10','ssss',3,'',12,2),(143,'2019-10-09 09:48:37.006478','9','testtwo',3,'',12,2),(144,'2019-10-09 09:48:37.007605','8','havij',3,'',12,2),(145,'2019-10-09 09:48:37.008630','7','arianalabs',3,'',12,2),(146,'2019-10-09 09:48:37.009673','6','Test',3,'',12,2),(147,'2019-10-09 09:48:37.011585','5','arianalabs',3,'',12,2),(148,'2019-10-09 09:48:37.012642','4','FGHJ',3,'',12,2),(149,'2019-10-09 09:48:37.013864','3','ARIANALABSS',3,'',12,2),(150,'2019-10-09 09:48:37.014953','1','arianalabs',3,'',12,2),(151,'2019-10-09 09:49:11.054910','9','',3,'',6,2),(152,'2019-10-09 09:49:11.057143','7','',3,'',6,2),(153,'2019-10-09 09:49:11.058351','3','',3,'',6,2),(154,'2019-10-09 09:49:11.060219','6','',3,'',6,2),(155,'2019-10-09 09:49:11.062391','5','',3,'',6,2),(156,'2019-10-09 09:49:11.063464','4','',3,'',6,2),(157,'2019-10-09 10:37:55.099162','25','Badge object (25)',2,'[{\"changed\": {\"fields\": [\"name\", \"description\"]}}]',17,2),(158,'2019-10-09 10:42:14.638890','23','Badge object (23)',2,'[{\"changed\": {\"fields\": [\"name\", \"point_amount\", \"description\"]}}]',17,2),(159,'2019-10-09 11:21:57.637686','83','Icon object (83)',1,'[{\"added\": {}}]',16,2),(160,'2019-10-09 11:24:14.575202','62','Icon object (62)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(161,'2019-10-09 11:25:09.630590','63','Icon object (63)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(162,'2019-10-09 11:25:26.457921','64','Icon object (64)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(163,'2019-10-09 11:25:40.621772','65','Icon object (65)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(164,'2019-10-09 11:25:52.535572','66','Icon object (66)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(165,'2019-10-09 11:26:02.016448','67','Icon object (67)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(166,'2019-10-09 11:26:12.160374','68','Icon object (68)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(167,'2019-10-09 11:26:22.614744','69','Icon object (69)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(168,'2019-10-09 11:26:44.535384','70','Icon object (70)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(169,'2019-10-09 11:26:55.708717','71','Icon object (71)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(170,'2019-10-09 11:27:16.669925','73','Icon object (73)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(171,'2019-10-09 11:27:28.776571','74','Icon object (74)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(172,'2019-10-09 11:27:38.546288','75','Icon object (75)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(173,'2019-10-09 11:27:47.828712','76','Icon object (76)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(174,'2019-10-09 11:28:00.999646','77','Icon object (77)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(175,'2019-10-09 11:28:12.487930','78','Icon object (78)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(176,'2019-10-09 11:28:22.972733','79','Icon object (79)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(177,'2019-10-09 11:30:04.962900','72','Icon object (72)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(178,'2019-10-09 11:30:56.385317','80','Icon object (80)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(179,'2019-10-09 11:31:08.707610','81','Icon object (81)',2,'[{\"changed\": {\"fields\": [\"is_global\", \"image\"]}}]',16,2),(180,'2019-10-09 11:31:28.372929','83','Icon object (83)',3,'',16,2),(181,'2019-10-09 11:31:34.211892','84','Icon object (84)',3,'',16,2),(182,'2019-10-09 11:31:37.841693','82','Icon object (82)',3,'',16,2),(183,'2019-10-09 11:32:34.815139','85','Icon object (85)',1,'[{\"added\": {}}]',16,2),(184,'2019-10-09 11:32:45.982151','86','Icon object (86)',1,'[{\"added\": {}}]',16,2),(185,'2019-10-09 11:33:09.002525','87','Icon object (87)',1,'[{\"added\": {}}]',16,2),(186,'2019-10-09 11:33:23.565264','88','Icon object (88)',1,'[{\"added\": {}}]',16,2),(187,'2019-10-09 11:33:44.286260','89','Icon object (89)',1,'[{\"added\": {}}]',16,2),(188,'2019-10-09 11:34:29.062447','90','Icon object (90)',1,'[{\"added\": {}}]',16,2),(189,'2019-10-09 11:35:05.476080','91','Icon object (91)',1,'[{\"added\": {}}]',16,2),(190,'2019-10-09 11:35:56.147594','92','Icon object (92)',1,'[{\"added\": {}}]',16,2),(191,'2019-10-09 11:36:24.851840','93','Icon object (93)',1,'[{\"added\": {}}]',16,2),(192,'2019-10-09 11:36:36.143132','94','Icon object (94)',1,'[{\"added\": {}}]',16,2),(193,'2019-10-09 11:56:35.835683','33','sina eftekhari',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(194,'2019-10-09 11:56:44.674956','27','sara bahman',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(195,'2019-10-09 11:56:52.744521','15','saman amiri',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(196,'2019-10-09 11:57:03.379012','29','sam shaygan',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(197,'2019-10-09 11:57:13.592797','19','rana nematollahi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(198,'2019-10-09 11:57:24.953401','32','nooshin pahlevan',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(199,'2019-10-09 11:57:34.120287','28','nahid firouzi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(200,'2019-10-09 11:57:48.096738','34','mostafa alemzadeh',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(201,'2019-10-09 11:57:58.627525','26','mojtaba fattahi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(202,'2019-10-09 11:58:11.925697','22','mohammadreza sadeghzadeh',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(203,'2019-10-09 11:58:37.496804','31','mohammadhasan zarei',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(204,'2019-10-09 11:58:51.852616','30','mohammad mohammadzadeh',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(205,'2019-10-09 11:59:01.640985','20','mehdi torabian',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(206,'2019-10-09 11:59:10.941012','25','mahsa dayi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(207,'2019-10-09 11:59:27.276433','21','mahdi mahdi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(208,'2019-10-09 11:59:37.733395','13','javad hosseini',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(209,'2019-10-09 11:59:57.313007','12','haniyeh bagheri',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(210,'2019-10-09 12:00:12.655789','17','hamidreza khosravi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(211,'2019-10-09 12:00:22.499509','11','hamid atefi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(212,'2019-10-09 12:00:34.271972','10','hajar sadeghi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(213,'2019-10-09 12:00:42.695560','18','farkhondeh sharifi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(214,'2019-10-09 12:00:55.243415','23','elaheh yousefi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(215,'2019-10-09 12:01:05.140685','14','ashkan dehbashi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(216,'2019-10-09 12:01:13.302854','24','ali zeyghami',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(217,'2019-10-09 12:01:23.550012','16','ali tasbandi',2,'[{\"changed\": {\"fields\": [\"first_name\", \"last_name\"]}}]',6,2),(218,'2019-10-09 12:01:29.769997','2','admin',2,'[{\"changed\": {\"fields\": [\"first_name\"]}}]',6,2);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(17,'badge','badge'),(16,'badge','icon'),(15,'budget','budget'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(7,'social_django','association'),(8,'social_django','code'),(9,'social_django','nonce'),(11,'social_django','partial'),(10,'social_django','usersocialauth'),(14,'space','industry'),(13,'space','member'),(12,'space','space'),(18,'transaction','transaction'),(6,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-08-10 14:00:52.991115'),(2,'contenttypes','0002_remove_content_type_name','2019-08-10 14:00:53.028964'),(3,'auth','0001_initial','2019-08-10 14:00:53.072273'),(4,'auth','0002_alter_permission_name_max_length','2019-08-10 14:00:53.141008'),(5,'auth','0003_alter_user_email_max_length','2019-08-10 14:00:53.147682'),(6,'auth','0004_alter_user_username_opts','2019-08-10 14:00:53.154452'),(7,'auth','0005_alter_user_last_login_null','2019-08-10 14:00:53.161057'),(8,'auth','0006_require_contenttypes_0002','2019-08-10 14:00:53.165072'),(9,'auth','0007_alter_validators_add_error_messages','2019-08-10 14:00:53.172128'),(10,'auth','0008_alter_user_username_max_length','2019-08-10 14:00:53.180831'),(11,'auth','0009_alter_user_last_name_max_length','2019-08-10 14:00:53.188381'),(12,'auth','0010_alter_group_name_max_length','2019-08-10 14:00:53.199060'),(13,'auth','0011_update_proxy_permissions','2019-08-10 14:00:53.208178'),(14,'user','0001_initial','2019-08-10 14:00:53.259345'),(15,'admin','0001_initial','2019-08-10 14:00:53.341398'),(16,'admin','0002_logentry_remove_auto_add','2019-08-10 14:00:53.379028'),(17,'admin','0003_logentry_add_action_flag_choices','2019-08-10 14:00:53.386422'),(18,'sessions','0001_initial','2019-08-10 14:00:53.398395'),(19,'default','0001_initial','2019-08-10 14:00:53.487812'),(20,'social_auth','0001_initial','2019-08-10 14:00:53.489250'),(21,'default','0002_add_related_name','2019-08-10 14:00:53.537138'),(22,'social_auth','0002_add_related_name','2019-08-10 14:00:53.541154'),(23,'default','0003_alter_email_max_length','2019-08-10 14:00:53.548032'),(24,'social_auth','0003_alter_email_max_length','2019-08-10 14:00:53.550084'),(25,'default','0004_auto_20160423_0400','2019-08-10 14:00:53.557851'),(26,'social_auth','0004_auto_20160423_0400','2019-08-10 14:00:53.560744'),(27,'social_auth','0005_auto_20160727_2333','2019-08-10 14:00:53.573187'),(28,'social_django','0006_partial','2019-08-10 14:00:53.589466'),(29,'social_django','0007_code_timestamp','2019-08-10 14:00:53.620870'),(30,'social_django','0008_partial_timestamp','2019-08-10 14:00:53.646127'),(31,'social_django','0002_add_related_name','2019-08-10 14:00:53.657276'),(32,'social_django','0005_auto_20160727_2333','2019-08-10 14:00:53.659664'),(33,'social_django','0004_auto_20160423_0400','2019-08-10 14:00:53.661892'),(34,'social_django','0001_initial','2019-08-10 14:00:53.664222'),(35,'social_django','0003_alter_email_max_length','2019-08-10 14:00:53.666269'),(36,'space','0001_initial','2019-08-14 06:51:36.195708'),(37,'budget','0001_initial','2019-08-19 06:24:41.622060'),(38,'badge','0001_initial','2019-09-21 11:07:24.662145'),(39,'badge','0002_auto_20190922_1158','2019-09-22 12:45:15.390513'),(40,'badge','0003_auto_20190923_1402','2019-10-09 09:48:26.798866'),(41,'space','0002_auto_20190923_1402','2019-10-09 09:48:26.982573'),(42,'transaction','0001_initial','2019-10-09 09:48:27.009414'),(43,'transaction','0002_transaction_space','2019-10-09 09:48:27.063292');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('8tnjocbmhbosaerc73thu129nn6ceyre','MWExYzBhZTJkNjFiMzJmNTA1NjRhODY1MzA1NGEyZTYxNGUxNTE2ZDp7Im5leHQiOiIvZ2V0X3N0YXJ0ZWQvZmluZF9zcGFjZS8iLCJsaW5rZWRpbi1vYXV0aDJfc3RhdGUiOiJVVndXeEVSRmphQUh0amM4dTNSaEpKdW1LamozVDUwTyIsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiY3VzdG9tX29hdXRoLmJhY2tlbmRzLmxpbmtlZGluLkxpbmtlZGluT0F1dGgyIiwiX2F1dGhfdXNlcl9oYXNoIjoiOTVhYjljNGQ4M2U4YjAwMzQyYmUwMmE2MjBmNTY0ZDlhNmY2YTQ0ZiIsInNvY2lhbF9hdXRoX2xhc3RfbG9naW5fYmFja2VuZCI6ImxpbmtlZGluLW9hdXRoMiJ9','2019-10-07 11:42:23.635091'),('f6miq5ydzpx7icpeeoag6r3scg9c9pdh','MTdiYjhjODUzNGQzYTYzZDgwYzlkMzMxMjgxODUzMmZhODg5YzU4NTp7Im5leHQiOiIvZ2V0X3N0YXJ0ZWQvZmluZF9zcGFjZS8iLCJnb29nbGUtb2F1dGgyX3N0YXRlIjoiWW5HRmJ5dnBTSzlkM0g1VzVvek8zOW91Qzk3U2NXbE8iLCJfYXV0aF91c2VyX2lkIjoiMSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6InNvY2lhbF9jb3JlLmJhY2tlbmRzLmdvb2dsZS5Hb29nbGVPQXV0aDIiLCJfYXV0aF91c2VyX2hhc2giOiI5NWFiOWM0ZDgzZThiMDAzNDJiZTAyYTYyMGY1NjRkOWE2ZjZhNDRmIiwic29jaWFsX2F1dGhfbGFzdF9sb2dpbl9iYWNrZW5kIjoiZ29vZ2xlLW9hdXRoMiJ9','2019-09-09 08:11:20.823687'),('fjw1couyo6ravjykcxghu96it5g1h04c','ZDMyZTRhNThkMWE3ZDRiM2Q3ZGY2OWZhN2UwYjJiMjg5Mjc2OGZkYjp7Imdvb2dsZS1vYXV0aDJfc3RhdGUiOiJVUlZ4Ukw4QkRWUHhkOWtnODhTb2c4SVFBMmswUzlJZyIsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoic29jaWFsX2NvcmUuYmFja2VuZHMuZ29vZ2xlLkdvb2dsZU9BdXRoMiIsIl9hdXRoX3VzZXJfaGFzaCI6Ijk1YWI5YzRkODNlOGIwMDM0MmJlMDJhNjIwZjU2NGQ5YTZmNmE0NGYiLCJzb2NpYWxfYXV0aF9sYXN0X2xvZ2luX2JhY2tlbmQiOiJnb29nbGUtb2F1dGgyIiwiX2xhbmd1YWdlIjoiZW4ifQ==','2019-09-08 11:46:23.791488'),('juvxq0r0yrafxlz9rp8t0fdj00ase0h3','MGU1MzQ1MDkzYzk4ZDE3NTJjNDY0MTg0NTE0YWFlMjJkNjAxOTYzMjp7Im5leHQiOiIvZ2V0X3N0YXJ0ZWQvZmluZF9zcGFjZS8iLCJnb29nbGUtb2F1dGgyX3N0YXRlIjoiNTJRWXdPNVFON2wzNGpwM0NZVGN5TUZNRDR6MmRHaDIiLCJfYXV0aF91c2VyX2lkIjoiOSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZGEwMDBiYWFmNmQ3MmE1YzExYmY3YWJmOTI3NTY3MzMwMDBhOTA5OSJ9','2019-09-28 11:56:39.667127'),('k9pywv9dtu0dxu2h1gb9kugawph1fl35','YmUzNzRmM2MwZTcwZTUwZmQ5MGQ2ZWE5YjE5YTkzYzlhNDgzNDFiNzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2OWM4ZGI5Y2IwNzIzMDIwMjBmYmM2NGZmNmI2ZTVjZTQyNjkyNWQ5In0=','2019-09-11 06:56:21.937927'),('u0qqgxasnxzwz6mta0fpmkkv5zwamjjg','YmUzNzRmM2MwZTcwZTUwZmQ5MGQ2ZWE5YjE5YTkzYzlhNDgzNDFiNzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2OWM4ZGI5Y2IwNzIzMDIwMjBmYmM2NGZmNmI2ZTVjZTQyNjkyNWQ5In0=','2019-10-23 09:55:42.727938'),('xgpxzmpvnhla0n2hffk03z933u1smbb2','ZjM1NGU3ZGQwOWNlYTY5NDFlMzBkMmFkYTM0NmVmZGNjOTM4MTgwYzp7Im5leHQiOiIvZ2V0X3N0YXJ0ZWQvZmluZF9zcGFjZS8iLCJnb29nbGUtb2F1dGgyX3N0YXRlIjoieWZKT2V2b3dEd3dHUG9DS1dDbWFZbGhBT2JyWDVwSjEiLCJsaW5rZWRpbi1vYXV0aDJfc3RhdGUiOiJ1VVdXRjY3enNaR1A2dVc2d1lxYmRnOHdaNlZaNkRhTyIsIl9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5NWFiOWM0ZDgzZThiMDAzNDJiZTAyYTYyMGY1NjRkOWE2ZjZhNDRmIn0=','2019-09-08 06:39:12.086648');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_association`
--

DROP TABLE IF EXISTS `social_auth_association`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) NOT NULL,
  `handle` varchar(255) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `issued` int(11) NOT NULL,
  `lifetime` int(11) NOT NULL,
  `assoc_type` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_association_server_url_handle_078befa2_uniq` (`server_url`,`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_association`
--

LOCK TABLES `social_auth_association` WRITE;
/*!40000 ALTER TABLE `social_auth_association` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_association` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_code`
--

DROP TABLE IF EXISTS `social_auth_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `code` varchar(32) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_code_email_code_801b2d02_uniq` (`email`,`code`),
  KEY `social_auth_code_code_a2393167` (`code`),
  KEY `social_auth_code_timestamp_176b341f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_code`
--

LOCK TABLES `social_auth_code` WRITE;
/*!40000 ALTER TABLE `social_auth_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_nonce`
--

DROP TABLE IF EXISTS `social_auth_nonce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_nonce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) NOT NULL,
  `timestamp` int(11) NOT NULL,
  `salt` varchar(65) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_nonce_server_url_timestamp_salt_f6284463_uniq` (`server_url`,`timestamp`,`salt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_nonce`
--

LOCK TABLES `social_auth_nonce` WRITE;
/*!40000 ALTER TABLE `social_auth_nonce` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_nonce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_partial`
--

DROP TABLE IF EXISTS `social_auth_partial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_partial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(32) NOT NULL,
  `next_step` smallint(5) unsigned NOT NULL,
  `backend` varchar(32) NOT NULL,
  `data` longtext NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `social_auth_partial_token_3017fea3` (`token`),
  KEY `social_auth_partial_timestamp_50f2119f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_partial`
--

LOCK TABLES `social_auth_partial` WRITE;
/*!40000 ALTER TABLE `social_auth_partial` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_auth_partial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_auth_usersocialauth`
--

DROP TABLE IF EXISTS `social_auth_usersocialauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_auth_usersocialauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(32) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `extra_data` longtext NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_usersocialauth_provider_uid_e6b5e668_uniq` (`provider`,`uid`),
  KEY `social_auth_usersocialauth_user_id_17d28448_fk_user_user_id` (`user_id`),
  CONSTRAINT `social_auth_usersocialauth_user_id_17d28448_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_auth_usersocialauth`
--

LOCK TABLES `social_auth_usersocialauth` WRITE;
/*!40000 ALTER TABLE `social_auth_usersocialauth` DISABLE KEYS */;
INSERT INTO `social_auth_usersocialauth` VALUES (2,'google-oauth2','sadeghi.hjr@gmail.com','{\"auth_time\": 1569220061, \"expires\": 3600, \"token_type\": \"Bearer\", \"profile_picture\": \"https://lh3.googleusercontent.com/a-/AAuE7mDX5ZzPlOw1dfCwqOsWiOWxwe6W314PvlslCMyP0Q\", \"access_token\": \"ya29.GluMB8rZpanBQRfoUOqJ6XOwktfhRrzcLPv2FhXTrc94cQp0KD8iQVNlhqpqDbZWk2f_9ZT-lZ6faBxEKPp0NWs4riQ7VsWQjH4FerJqJgASh0BKU1fwiUuzSZ1d\"}',1),(3,'linkedin-oauth2','-mKi9L54ii','{\"auth_time\": 1569238943, \"id\": \"-mKi9L54ii\", \"expires\": 5184000, \"first_name\": {\"localized\": {\"en_US\": \"Hajar\"}, \"preferredLocale\": {\"country\": \"US\", \"language\": \"en\"}}, \"last_name\": {\"localized\": {\"en_US\": \"Sadeghi\"}, \"preferredLocale\": {\"country\": \"US\", \"language\": \"en\"}}, \"email\": \"sadeghi.hjr@gmail.com\", \"profile_picture\": \"https://media.licdn.com/dms/image/C4D03AQG5YJXmgZUSvw/profile-displayphoto-shrink_800_800/0?e=1574899200&v=beta&t=xUn6AlaIzZkJvq9zDX8TCMERasAz9i-BnEmg-q16ec4\", \"token_type\": null, \"access_token\": \"AQWr47qA8PbZ_Iw_qL_xi4aJ3aJbgFw4UWx_Wvb6G9AihwUwPB2NLJzg_Hk_-1OVHigVH0cC3NXGgSHB7bgMnR_8RLhoOWvtOdFCt4s5BlJ0rQEwBbOgp-9iG4IN8CPJmZBPubIuxkzuH89d8phTV3aldRSlMwXfGMZ0jKEyTDEP2fCV6ROnK7V2LdjIPT-qq975CCToy3Ab1hvXldgCFlIaIKXoXjHHuN2l_24VxreDoAC7QlR4NhQtRJTBTzmbKWutEklPouxZUL3tfdKWFd6ljvrThwDR0N3J5gB1BS-RcQQGG1Fl7tZguEfQUldhRbuAU-4XJgAmzaI7sgoRMGBtGplasw\"}',1);
/*!40000 ALTER TABLE `social_auth_usersocialauth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_industry`
--

DROP TABLE IF EXISTS `space_industry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_industry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_industry`
--

LOCK TABLES `space_industry` WRITE;
/*!40000 ALTER TABLE `space_industry` DISABLE KEYS */;
INSERT INTO `space_industry` VALUES (1,'software',1),(2,'legal',1),(3,'health',1),(4,'hardware',1),(5,'restaurant',1),(6,'insurance',1);
/*!40000 ALTER TABLE `space_industry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_member`
--

DROP TABLE IF EXISTS `space_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `space_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `budget_point_amount` int(10) unsigned NOT NULL,
  `earned_point_amount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `space_member_space_id_c83730b2_fk_space_space_id` (`space_id`),
  KEY `space_member_user_id_db36dd68_fk_user_user_id` (`user_id`),
  CONSTRAINT `space_member_space_id_c83730b2_fk_space_space_id` FOREIGN KEY (`space_id`) REFERENCES `space_space` (`id`),
  CONSTRAINT `space_member_user_id_db36dd68_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_member`
--

LOCK TABLES `space_member` WRITE;
/*!40000 ALTER TABLE `space_member` DISABLE KEYS */;
INSERT INTO `space_member` VALUES (16,15,2,1,0,0),(17,15,10,1,0,0),(18,15,11,1,0,0),(19,15,12,1,0,0),(20,15,13,1,0,0),(21,15,14,1,0,0),(22,15,15,1,0,0),(23,15,16,1,0,0),(24,15,17,1,0,0),(25,15,18,1,0,0),(26,15,19,1,0,0),(27,15,20,1,0,0),(28,15,21,1,0,0),(29,15,22,1,0,0),(30,15,23,1,0,0),(31,15,24,1,0,0),(32,15,25,1,0,0),(33,15,26,1,0,0),(34,15,27,1,0,0),(35,15,28,1,0,0),(36,15,29,1,0,0),(37,15,30,1,0,0),(38,15,31,1,0,0),(39,15,32,1,0,0),(40,15,33,1,0,0),(41,15,34,1,0,0);
/*!40000 ALTER TABLE `space_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_space`
--

DROP TABLE IF EXISTS `space_space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `space_space` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `member_count` smallint(5) unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `created_date` datetime(6) NOT NULL,
  `industry_id` int(11) DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `space_space_industry_id_e6c1e113_fk_space_industry_id` (`industry_id`),
  KEY `space_space_owner_id_ccc5c151_fk_user_user_id` (`owner_id`),
  CONSTRAINT `space_space_industry_id_e6c1e113_fk_space_industry_id` FOREIGN KEY (`industry_id`) REFERENCES `space_industry` (`id`),
  CONSTRAINT `space_space_owner_id_ccc5c151_fk_user_user_id` FOREIGN KEY (`owner_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_space`
--

LOCK TABLES `space_space` WRITE;
/*!40000 ALTER TABLE `space_space` DISABLE KEYS */;
INSERT INTO `space_space` VALUES (15,'arianalabs','arianalabs',NULL,1,'2019-10-09 09:49:42.986474',1,2);
/*!40000 ALTER TABLE `space_space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_transaction`
--

DROP TABLE IF EXISTS `transaction_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transaction_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL,
  `source_object_id` int(10) unsigned NOT NULL,
  `destination_object_id` int(10) unsigned NOT NULL,
  `point_amount` int(10) unsigned NOT NULL,
  `destination_content_type_id` int(11) NOT NULL,
  `source_content_type_id` int(11) NOT NULL,
  `space_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `transaction_transact_destination_content__852ef094_fk_django_co` (`destination_content_type_id`),
  KEY `transaction_transact_source_content_type__846a5b7f_fk_django_co` (`source_content_type_id`),
  KEY `transaction_transaction_space_id_07fe7f18_fk_space_space_id` (`space_id`),
  CONSTRAINT `transaction_transact_destination_content__852ef094_fk_django_co` FOREIGN KEY (`destination_content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `transaction_transact_source_content_type__846a5b7f_fk_django_co` FOREIGN KEY (`source_content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `transaction_transaction_space_id_07fe7f18_fk_space_space_id` FOREIGN KEY (`space_id`) REFERENCES `space_space` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_transaction`
--

LOCK TABLES `transaction_transaction` WRITE;
/*!40000 ALTER TABLE `transaction_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `profile_picture` varchar(100) DEFAULT NULL,
  `is_username_set` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
INSERT INTO `user_user` VALUES (1,'!Hkrx7yc9lJ4ZJu6abMtxBaIVFWhvIV3iJzig2E6q','2019-10-09 09:55:23.404174',0,'HajarSadeghi','Hajar','Sadeghi','sadeghi.hjr@gmail.com',0,1,'2019-08-10 14:01:08.928860','profile_pictures/HajarSadeghi.jpg',0),(2,'pbkdf2_sha256$150000$BFit9WQh0OZQ$x/VnkUtjCItYVjrN3oQZgxBoxbZa7WFQyq2DLO7lI2A=','2019-10-09 09:55:42.000000',1,'admin','admin','','',1,1,'2019-08-10 14:01:51.000000','',0),(10,'',NULL,0,'hajar@arianatech.ir','hajar','sadeghi','hajar@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(11,'',NULL,0,'hamid@arianatech.ir','hamid','atefi','hamid@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(12,'',NULL,0,'haniyeh@arianatech.ir','haniyeh','bagheri','haniyeh@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(13,'',NULL,0,'javad@arianatech.ir','javad','hosseini','javad@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(14,'',NULL,0,'ashkan@arianatech.ir','ashkan','dehbashi','ashkan@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(15,'',NULL,0,'saman@arianatech.ir','saman','amiri','saman@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(16,'',NULL,0,'ali.tasbandi@arianatech.ir','ali','tasbandi','ali.tasbandi@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(17,'',NULL,0,'hamidreza@arianatech.ir','hamidreza','khosravi','hamidreza@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(18,'',NULL,0,'farkhondeh@arianatech.ir','farkhondeh','sharifi','farkhondeh@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(19,'',NULL,0,'rana@arianatech.ir','rana','nematollahi','rana@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(20,'',NULL,0,'mehdi.torabian@arianatech.ir','mehdi','torabian','mehdi.torabian@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(21,'',NULL,0,'mahdi@arianatech.ir','mahdi','mahdi','mahdi@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(22,'',NULL,0,'mohammadreza@arianatech.ir','mohammadreza','sadeghzadeh','mohammadreza@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(23,'',NULL,0,'elaheh@arianatech.ir','elaheh','yousefi','elaheh@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(24,'',NULL,0,'ali.zeyghami@arianatech.ir','ali','zeyghami','ali.zeyghami@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(25,'',NULL,0,'mahsa@arianatech.ir','mahsa','dayi','mahsa@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(26,'',NULL,0,'mojtaba@arianatech.ir','mojtaba','fattahi','mojtaba@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(27,'',NULL,0,'sara@arianatech.ir','sara','bahman','sara@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(28,'',NULL,0,'nahid@arianatech.ir','nahid','firouzi','nahid@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(29,'',NULL,0,'sam@arianatech.ir','sam','shaygan','sam@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(30,'',NULL,0,'mohammad@arianatech.ir','mohammad','mohammadzadeh','mohammad@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(31,'',NULL,0,'mohammadhasan@arianatech.ir','mohammadhasan','zarei','mohammadhasan@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(32,'',NULL,0,'nooshin@arianatech.ir','nooshin','pahlevan','nooshin@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(33,'',NULL,0,'sina@arianatech.ir','sina','eftekhari','sina@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0),(34,'',NULL,0,'mostafa@arianatech.ir','mostafa','alemzadeh','mostafa@arianatech.ir',0,1,'2019-10-09 09:54:34.000000','',0);
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_groups`
--

DROP TABLE IF EXISTS `user_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_groups_user_id_group_id_bb60391f_uniq` (`user_id`,`group_id`),
  KEY `user_user_groups_group_id_c57f13c0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_user_groups_group_id_c57f13c0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_user_groups_user_id_13f9a20d_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_groups`
--

LOCK TABLES `user_user_groups` WRITE;
/*!40000 ALTER TABLE `user_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq` (`user_id`,`permission_id`),
  KEY `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_user_user_permissions_user_id_31782f58_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_user_permissions`
--

LOCK TABLES `user_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-09 12:11:27

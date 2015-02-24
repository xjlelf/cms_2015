# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.16)
# Database: cms
# Generation Time: 2015-02-24 07:46:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table managers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `managers`;

CREATE TABLE `managers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `pwd` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `managers` WRITE;
/*!40000 ALTER TABLE `managers` DISABLE KEYS */;

INSERT INTO `managers` (`id`, `login`, `pwd`)
VALUES
	(1,'admin','c75a2d386d3ca26df9b650ff0102b702c618b92b');

/*!40000 ALTER TABLE `managers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table menus
# ------------------------------------------------------------

DROP TABLE IF EXISTS `menus`;

CREATE TABLE `menus` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` varchar(50) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `url` varchar(100) DEFAULT NULL COMMENT '访问路径',
  `pid` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;

INSERT INTO `menus` (`id`, `text`, `url`, `pid`)
VALUES
	(1,'商品管理','',0),
	(5,'商品列表','/product/lists',1),
	(6,'商品分类列表','/category/lists',1);

/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sku_sn` varchar(20) NOT NULL DEFAULT '' COMMENT '商品编号',
  `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
  `original_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品成本价',
  `stand` decimal(6,2) NOT NULL DEFAULT '0.00' COMMENT '商品规格（kg/桶）',
  `cate_1` varchar(10) NOT NULL DEFAULT '' COMMENT '分类1',
  `cate_2` varchar(10) NOT NULL DEFAULT '' COMMENT '分类2',
  `color_code` varchar(1) NOT NULL DEFAULT '' COMMENT '颜色码',
  `created` datetime NOT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `sku_sn`, `goods_name`, `original_price`, `stand`, `cate_1`, `cate_2`, `color_code`, `created`, `modified`)
VALUES
	(1,'blx011','白色氯化橡胶面漆',10.00,12.50,'lx','01','b','2015-02-16 14:04:38','2015-02-19 10:39:11'),
	(2,'llx011','绿色氯化橡胶面漆',11.00,12.50,'lx','01','l','2015-02-16 14:07:49','2015-02-19 10:39:25'),
	(3,'tcs051','铁红醇酸防锈漆',16.50,13.00,'cs','05','t','2015-02-19 10:42:59','2015-02-19 10:42:59'),
	(4,'bcs021','白色醇酸调合漆',21.00,19.00,'cs','02','b','2015-02-19 11:15:35','2015-02-19 11:15:35'),
	(5,'jlx011','桔黄氯化橡胶面漆',13.00,23.00,'lx','01','j','2015-02-22 05:58:56','2015-02-22 05:58:56');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products_category`;

CREATE TABLE `products_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(4) NOT NULL COMMENT '类型',
  `category_name` varchar(30) NOT NULL DEFAULT '' COMMENT '分类名称',
  `code` varchar(10) NOT NULL DEFAULT '' COMMENT '分类编码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products_category` WRITE;
/*!40000 ALTER TABLE `products_category` DISABLE KEYS */;

INSERT INTO `products_category` (`id`, `type`, `category_name`, `code`)
VALUES
	(1,1,'氯化橡胶','lx'),
	(2,1,'醇酸','cs'),
	(3,1,'环氧','hy'),
	(4,2,'面漆','01'),
	(5,2,'调合漆','02'),
	(6,2,'甲板漆','03'),
	(7,2,'船壳漆','04'),
	(8,2,'防锈漆','05'),
	(9,2,'路标漆','06'),
	(10,2,'地坪漆','07');

/*!40000 ALTER TABLE `products_category` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE DATABASE IF NOT EXISTS `adonis-pizza`;
USE `adonis-pizza`;

CREATE TABLE IF NOT EXISTS `pizza` (
  `id` int(10) NOT NULL DEFAULT 0 COMMENT 'id',
  `name` varchar(128) DEFAULT NULL COMMENT 'name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

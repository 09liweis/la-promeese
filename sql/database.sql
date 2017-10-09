-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2017 at 06:45 PM
-- Server version: 5.5.57-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `c9`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`) VALUES
(1, '许诺'),
(2, '韩露阳'),
(3, '乔粤'),
(4, '孙浩棠'),
(5, '张翊人'),
(6, '宋海培');

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE IF NOT EXISTS `provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `region_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `region_id`) VALUES
(1, '山东', 1),
(2, '江苏', 1),
(3, '上海', 1),
(4, '浙江', 1),
(5, '安徽', 1),
(6, '福建', 1),
(7, '江西', 1),
(8, '广东', 2),
(9, '广西', 2),
(10, '海南', 2),
(11, '河南', 3),
(12, '湖南', 3),
(13, '湖北', 3),
(14, '北京', 4),
(15, '天津', 4),
(16, '河北', 4),
(17, '山西', 4),
(18, '内蒙古自治区', 4),
(19, '宁夏', 5),
(20, '青海', 5),
(21, '陕西', 5),
(22, '甘肃', 5),
(23, '新疆', 5),
(24, '四川', 6),
(25, '贵州', 6),
(26, '云南', 6),
(27, '重庆', 6),
(28, '西藏', 6),
(29, '辽宁', 7),
(30, '吉林', 7),
(31, '黑龙江', 7),
(32, '香港', 8),
(33, '澳门', 8),
(34, '台湾', 8);

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE IF NOT EXISTS `regions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `name`) VALUES
(1, '华东地区'),
(2, '华南地区'),
(3, '华中地区'),
(4, '华北地区'),
(5, '西北地区'),
(6, '西南地区'),
(7, '东北地区'),
(8, '港澳台地区');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `gender` varchar(225) NOT NULL,
  `dob` date NOT NULL,
  `region_id` int(11) NOT NULL,
  `province_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT '责任客服',
  `high_info` varchar(225) NOT NULL COMMENT '中国高中信息',
  `uni_info` varchar(225) NOT NULL COMMENT '中国大学信息',
  `visa_info` varchar(225) NOT NULL COMMENT '签证信息',
  `visa_date` date NOT NULL,
  `passport_date` date NOT NULL,
  `phone` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `location_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `gender`, `dob`, `region_id`, `province_id`, `city_id`, `employee_id`, `high_info`, `uni_info`, `visa_info`, `visa_date`, `passport_date`, `phone`, `email`, `location_id`, `agency_id`, `created_at`) VALUES
(1, 'WEISEN LI', 'WEISEN LI', '1989-12-16', 4, 17, 0, 0, '', 'Canada', '', '0000-00-00', '0000-00-00', '6477601452', 'weisen.li@hotmail.com', 0, 0, '0000-00-00 00:00:00');

-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2017 at 03:54 PM
-- Server version: 5.5.57-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `c9`
--

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE IF NOT EXISTS `businesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `government_fee` float NOT NULL,
  `service_fee` float NOT NULL,
  `post_fee` float NOT NULL,
  `application_fee` int(11) NOT NULL,
  `progress_id` int(11) NOT NULL,
  `commission_progress_id` int(11) NOT NULL,
  `submit_date` date NOT NULL,
  `new_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT=' 业绩' AUTO_INCREMENT=5 ;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `student_id`, `service_id`, `sub_service_id`, `government_fee`, `service_fee`, `post_fee`, `application_fee`, `progress_id`, `commission_progress_id`, `submit_date`, `new_date`) VALUES
(1, 1, 7, 47, 100, 300, 50, 0, 12, 0, '2017-10-05', '2018-12-19'),
(2, 1, 4, 19, 0, 1000, 0, 200, 2, 0, '2017-10-05', '2017-12-18'),
(3, 1, 8, 61, 0, 1000, 10, 1500, 17, 0, '2017-10-21', '2018-10-21'),
(4, 1, 4, 19, 0, 7000, 23, 4000, 2, 0, '2017-10-20', '2017-12-19');

-- --------------------------------------------------------

--
-- Table structure for table `commission_progresses`
--

CREATE TABLE IF NOT EXISTS `commission_progresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `type` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='佣金申报type: free =>业绩 type: paid =>业务' AUTO_INCREMENT=12 ;

--
-- Dumping data for table `commission_progresses`
--

INSERT INTO `commission_progresses` (`id`, `name`, `type`) VALUES
(1, '等待申报', 'free'),
(2, '申报语言', 'free'),
(3, '申报第一学期', 'free'),
(4, '申报第二学期', 'free'),
(5, '语言已结算', 'free'),
(6, '第一学期已结算', 'free'),
(7, '第二学期已结算', 'free'),
(8, '等待申报', 'paid'),
(9, '申报完成', 'paid'),
(10, '已结清', 'paid'),
(11, '无佣金', 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `admin_level` int(11) NOT NULL COMMENT '1: super, 2: normal, 3: read only',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `password`, `admin_level`) VALUES
(1, '许诺', 'xunuo@gmail.com', '1234', 1),
(2, '韩露阳', '', '', 0),
(3, '乔粤', '', '', 0),
(4, '孙浩棠', '', '', 0),
(5, '张翊人', '', '', 0),
(6, '宋海培', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE IF NOT EXISTS `offices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='客人归属' AUTO_INCREMENT=9 ;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `name`) VALUES
(1, '多伦多'),
(2, '哈密尔顿'),
(3, '伦敦'),
(4, '密西沙加'),
(5, '渥太华'),
(6, '四川'),
(7, '新疆'),
(8, '青岛');

-- --------------------------------------------------------

--
-- Table structure for table `performances`
--

CREATE TABLE IF NOT EXISTS `performances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_service_id` int(11) NOT NULL,
  `fee` float NOT NULL,
  `progress_id` int(11) NOT NULL,
  `commission_progress_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `performances`
--

INSERT INTO `performances` (`id`, `student_id`, `service_id`, `sub_service_id`, `fee`, `progress_id`, `commission_progress_id`) VALUES
(1, 1, 1, 1, 3000, 2, 7),
(2, 1, 2, 8, 4000, 5, 5),
(3, 1, 2, 14, 5000, 5, 3),
(4, 1, 2, 7, 10000, 2, 7),
(5, 1, 2, 10, 6000, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `progresses`
--

CREATE TABLE IF NOT EXISTS `progresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `progresses`
--

INSERT INTO `progresses` (`id`, `name`, `service_id`) VALUES
(1, '材料欠缺', 4),
(2, '申请递交', 4),
(3, 'Offer获得', 4),
(4, '催缴学费', 4),
(5, '已付全款', 4),
(6, '放弃申请', 4),
(7, '未读', 4),
(8, 'Defer Offer', 4),
(9, '材料欠缺', 7),
(10, '申请递交', 7),
(11, '签证获批', 7),
(12, '签证被拒', 7),
(13, '预约体检', 7),
(14, '补交材料', 7),
(15, '材料欠缺', 8),
(16, '申请递交', 8),
(17, '移民获批', 8),
(18, '移民被拒', 8),
(19, '放弃申请', 8),
(20, '预约面试', 8),
(21, '预约体检', 8),
(22, '补交材料', 8),
(23, '面试', 9),
(24, '入职', 9),
(25, '放弃申请', 9);

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
-- Table structure for table `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `is_free` tinyint(4) NOT NULL COMMENT '1 for free, 0 for not free',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `name`, `is_free`) VALUES
(1, '免费高中申请', 1),
(2, '免费学校申请', 1),
(3, '语言机构设申请', 1),
(4, '收费高中申请', 0),
(5, '收费学校申请101', 0),
(6, '收费学校申请105', 0),
(7, '签证申请', 0),
(8, '移民申请', 0),
(9, '工作申请', 0);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE IF NOT EXISTS `students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `username` varchar(225) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
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
  `office_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `username`, `password`, `gender`, `dob`, `region_id`, `province_id`, `city_id`, `employee_id`, `high_info`, `uni_info`, `visa_info`, `visa_date`, `passport_date`, `phone`, `email`, `office_id`, `agency_id`, `updated_at`) VALUES
(1, 'WEISEN LI', '', '', 'male', '1989-12-16', 4, 17, 0, 1, '', 'Canada', '', '2017-10-20', '2018-01-17', '6477601452', 'weisen.li@hotmail.com', 0, 0, '0000-00-00 00:00:00'),
(2, 'Sam', NULL, NULL, 'male', '1990-01-02', 2, 8, 0, 2, '二中', '韶关', '学签', '2017-12-12', '2019-02-12', '22222222', 'sam.li@hotmail.com', 1, 0, '2017-10-12 03:09:05'),
(3, 'Mandy', NULL, NULL, 'femal', '1993-01-23', 8, 32, 0, 4, '社会高中', '社会大学', '工作签证', '2017-12-23', '2019-09-23', '324234234', 'mandy@gmail.com', 1, 0, '2017-10-12 03:14:57');

-- --------------------------------------------------------

--
-- Table structure for table `sub_services`
--

CREATE TABLE IF NOT EXISTS `sub_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `government_fee` int(11) NOT NULL,
  `service_fee` int(11) NOT NULL,
  `post_fee` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=71 ;

--
-- Dumping data for table `sub_services`
--

INSERT INTO `sub_services` (`id`, `name`, `government_fee`, `service_fee`, `post_fee`, `service_id`) VALUES
(1, 'Golden Link', 0, 0, 0, 1),
(2, 'Richmond Hill', 0, 0, 0, 1),
(3, 'Yorklan High School', 0, 0, 0, 1),
(4, 'Acumen Academy', 0, 0, 0, 1),
(5, 'Centennial', 0, 0, 0, 2),
(6, 'Seneca', 0, 0, 0, 2),
(7, 'Humber', 0, 0, 0, 2),
(8, 'George Brown', 0, 0, 0, 2),
(9, 'Sheridan', 0, 0, 0, 2),
(10, 'St. Clair', 0, 0, 0, 2),
(11, 'St. Lawrence', 0, 0, 0, 2),
(12, 'Cambrian', 0, 0, 0, 2),
(13, 'Canadore', 0, 0, 0, 2),
(14, 'Lambton', 0, 0, 0, 2),
(15, 'Northern', 0, 0, 0, 2),
(16, 'Fanshawe', 0, 0, 0, 2),
(17, 'Georgian', 0, 0, 0, 2),
(18, 'Niagara', 0, 0, 0, 2),
(19, 'TDSB', 0, 0, 0, 4),
(20, 'TCDSB', 0, 0, 0, 4),
(21, 'UGDSB', 0, 0, 0, 4),
(22, 'Centennial', 0, 0, 0, 5),
(23, 'Seneca', 0, 0, 0, 5),
(24, 'Humber', 0, 0, 0, 5),
(25, 'George Brown', 0, 0, 0, 5),
(26, 'York University', 0, 0, 0, 5),
(27, 'Toronto Of University', 0, 0, 0, 5),
(28, 'Ryerson University', 0, 0, 0, 5),
(29, 'OCAD University', 0, 0, 0, 5),
(30, 'University Of Western', 0, 0, 0, 5),
(31, 'University Of Waterloo', 0, 0, 0, 5),
(32, 'McMaster University', 0, 0, 0, 5),
(33, 'Queen’s University', 0, 0, 0, 5),
(34, 'University Of Guelph', 0, 0, 0, 5),
(35, 'Carleton University', 0, 0, 0, 5),
(36, 'University Of Ottawa', 0, 0, 0, 5),
(37, 'Brock University', 0, 0, 0, 5),
(38, 'University Of Windsor', 0, 0, 0, 5),
(39, 'University Of Ontario', 0, 0, 0, 5),
(40, 'Lakehead University', 0, 0, 0, 5),
(41, 'Wilfrid Laurier University', 0, 0, 0, 5),
(42, 'Trent University', 0, 0, 0, 5),
(43, 'Laurentian University', 0, 0, 0, 5),
(44, 'Nipissing University', 0, 0, 0, 5),
(45, 'Algoma University', 0, 0, 0, 5),
(46, 'Saint Paul University', 0, 0, 0, 5),
(47, '小签', 0, 0, 0, 7),
(48, '学签续签', 0, 0, 0, 7),
(49, '境外学签', 0, 0, 0, 7),
(50, '身份恢复', 0, 0, 0, 7),
(51, '毕业工签', 0, 0, 0, 7),
(52, '配偶工签', 0, 0, 0, 7),
(53, '学签+小签', 0, 0, 0, 7),
(54, '过期学签+小签', 0, 0, 0, 7),
(55, '工签+小签', 0, 0, 0, 7),
(56, '美签', 0, 0, 0, 7),
(57, '日签', 0, 0, 0, 7),
(58, '申根签', 0, 0, 0, 7),
(59, '护照补办', 0, 0, 0, 7),
(60, '学签补办', 0, 0, 0, 7),
(61, '快速通道', 0, 0, 0, 8),
(62, '联邦自雇', 0, 0, 0, 8),
(63, '配偶担保', 0, 0, 0, 8),
(64, '父母担保', 0, 0, 0, 8),
(65, '难民', 0, 0, 0, 8),
(66, '省提名学生类别', 0, 0, 0, 8),
(67, '省提名雇主担保类别', 0, 0, 0, 8),
(68, '省提名投资类别', 0, 0, 0, 8),
(69, '真实工作', 0, 0, 0, 9),
(70, '挂靠', 0, 0, 0, 9);

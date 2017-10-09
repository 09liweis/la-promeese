-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2017 at 02:34 AM
-- Server version: 5.5.57-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `c9`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `performances`
--

INSERT INTO `performances` (`id`, `student_id`, `service_id`, `sub_service_id`, `fee`, `progress_id`, `commission_progress_id`) VALUES
(1, 1, 1, 1, 3000, 2, 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `sub_services`
--

CREATE TABLE IF NOT EXISTS `sub_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=71 ;

--
-- Dumping data for table `sub_services`
--

INSERT INTO `sub_services` (`id`, `name`, `service_id`) VALUES
(1, 'Golden Link', 1),
(2, 'Richmond Hill', 1),
(3, 'Yorklan High School', 1),
(4, 'Acumen Academy', 1),
(5, 'Centennial', 2),
(6, 'Seneca', 2),
(7, 'Humber', 2),
(8, 'George Brown', 2),
(9, 'Sheridan', 2),
(10, 'St. Clair', 2),
(11, 'St. Lawrence', 2),
(12, 'Cambrian', 2),
(13, 'Canadore', 2),
(14, 'Lambton', 2),
(15, 'Northern', 2),
(16, 'Fanshawe', 2),
(17, 'Georgian', 2),
(18, 'Niagara', 2),
(19, 'GTDSB', 4),
(20, 'GTCDSB', 4),
(21, 'GUGDSB', 4),
(22, 'Centennial', 5),
(23, 'Seneca', 5),
(24, 'Humber', 5),
(25, 'George Brown', 5),
(26, 'York University', 5),
(27, 'Toronto Of University', 5),
(28, 'Ryerson University', 5),
(29, 'OCAD University', 5),
(30, 'University Of Western', 5),
(31, 'University Of Waterloo', 5),
(32, 'McMaster University', 5),
(33, 'Queen’s University', 5),
(34, 'University Of Guelph', 5),
(35, 'Carleton University', 5),
(36, 'University Of Ottawa', 5),
(37, 'Brock University', 5),
(38, 'University Of Windsor', 5),
(39, 'University Of Ontario', 5),
(40, 'Lakehead University', 5),
(41, 'Wilfrid Laurier University', 5),
(42, 'Trent University', 5),
(43, 'Laurentian University', 5),
(44, 'Nipissing University', 5),
(45, 'Algoma University', 5),
(46, 'Saint Paul University', 5),
(47, '小签', 7),
(48, '学签续签', 7),
(49, '境外学签', 7),
(50, '身份恢复', 7),
(51, '毕业工签', 7),
(52, '配偶工签', 7),
(53, '学签+小签', 7),
(54, '过期学签+小签', 7),
(55, '工签+小签', 7),
(56, '美签', 7),
(57, '日签', 7),
(58, '申根签', 7),
(59, '护照补办', 7),
(60, '学签补办', 7),
(61, '快速通道', 8),
(62, '联邦自雇', 8),
(63, '配偶担保', 8),
(64, '父母担保', 8),
(65, '难民', 8),
(66, '省提名学生类别', 8),
(67, '省提名雇主担保类别', 8),
(68, '省提名投资类别', 8),
(69, '真实工作', 9),
(70, '挂靠', 9);

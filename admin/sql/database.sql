-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2017 at 11:18 PM
-- Server version: 5.5.57-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `c9`
--

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE IF NOT EXISTS `agencies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `name`) VALUES
(1, '加诺咨询');

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
  `employee_id` int(11) NOT NULL,
  `employee_material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT=' 业绩' AUTO_INCREMENT=7 ;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`id`, `student_id`, `service_id`, `sub_service_id`, `government_fee`, `service_fee`, `post_fee`, `application_fee`, `progress_id`, `commission_progress_id`, `submit_date`, `new_date`, `employee_id`, `employee_material_id`) VALUES
(1, 1, 7, 47, 100, 300, 50, 0, 11, 0, '2017-10-06', '2017-10-24', 2, 1),
(3, 1, 8, 61, 0, 1000, 10, 1500, 18, 0, '2017-10-21', '2018-10-21', 5, 3),
(5, 3, 4, 19, 0, 125, 25, 3666, 2, 0, '2017-12-12', '2017-12-30', 3, 3),
(6, 3, 7, 50, 2565, 2155, 25, 0, 10, 0, '2017-10-12', '2018-11-20', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  `province_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=671 ;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `province_id`) VALUES
(1, '济南市', 1),
(2, '青岛市', 1),
(3, '聊城市', 1),
(4, '德州市', 1),
(5, '东营市', 1),
(6, '淄博市', 1),
(7, '潍坊市', 1),
(8, '烟台市', 1),
(9, '威海市', 1),
(10, '日照市', 1),
(11, '临沂市', 1),
(12, '枣庄市', 1),
(13, '济宁市', 1),
(14, '泰安市', 1),
(15, '莱芜市', 1),
(16, '滨州市', 1),
(17, '菏泽市', 1),
(18, '胶州市', 1),
(19, '平度市', 1),
(20, '莱西市', 1),
(21, '临清市', 1),
(22, '乐陵市', 1),
(23, '禹城市', 1),
(24, '安丘市', 1),
(25, '昌邑市', 1),
(26, '高密市', 1),
(27, '青州市', 1),
(28, '诸城市', 1),
(29, '寿光市', 1),
(30, '栖霞市', 1),
(31, '海阳市', 1),
(32, '龙口市', 1),
(33, '莱阳市', 1),
(34, '莱州市', 1),
(35, '蓬莱市', 1),
(36, '招远市', 1),
(37, '荣成市', 1),
(38, '乳山市', 1),
(39, '滕州市', 1),
(40, '曲阜市', 1),
(41, '邹城市', 1),
(42, '新泰市', 1),
(43, '肥城市', 1),
(44, '南京市', 2),
(45, '徐州市', 2),
(46, '连云港市', 2),
(47, '宿迁市', 2),
(48, '淮安市', 2),
(49, '盐城市', 2),
(50, '扬州市', 2),
(51, '泰州市', 2),
(52, '南通市', 2),
(53, '镇江市', 2),
(54, '常州市', 2),
(55, '无锡市', 2),
(56, '苏州市', 2),
(57, '常熟市', 2),
(58, '张家港市', 2),
(59, '太仓市', 2),
(60, '昆山市', 2),
(61, '江阴市', 2),
(62, '宜兴市', 2),
(63, '溧阳市', 2),
(64, '扬中市', 2),
(65, '句容市', 2),
(66, '丹阳市', 2),
(67, '如皋市', 2),
(68, '海门市', 2),
(69, '启东市', 2),
(70, '高邮市', 2),
(71, '仪征市', 2),
(72, '兴化市', 2),
(73, '泰兴市', 2),
(74, '靖江市', 2),
(75, '东台市', 2),
(76, '邳州市', 2),
(77, '新沂市', 2),
(78, '杭州市', 4),
(79, '宁波市', 4),
(80, '湖州市', 4),
(81, '嘉兴市', 4),
(82, '舟山市', 4),
(83, '绍兴市', 4),
(84, '衢州市', 4),
(85, '金华市', 4),
(86, '台州市', 4),
(87, '温州市', 4),
(88, '丽水市', 4),
(89, '建德市', 4),
(90, '慈溪市', 4),
(91, '余姚市', 4),
(92, '平湖市', 4),
(93, '海宁市', 4),
(94, '桐乡市', 4),
(95, '诸暨市', 4),
(96, '嵊州市', 4),
(97, '江山市', 4),
(98, '兰溪市', 4),
(99, '永康市', 4),
(100, '义乌市', 4),
(101, '东阳市', 4),
(102, '临海市', 4),
(103, '温岭市', 4),
(104, '瑞安市', 4),
(105, '乐清市', 4),
(106, '龙泉市', 4),
(107, '玉环市', 4),
(108, '合肥市', 5),
(109, '芜湖市', 5),
(110, '蚌埠市', 5),
(111, '淮南市', 5),
(112, '马鞍山市', 5),
(113, '淮北市', 5),
(114, '铜陵市', 5),
(115, '安庆市', 5),
(116, '黄山市', 5),
(117, '滁州市', 5),
(118, '阜阳市', 5),
(119, '宿州市', 5),
(120, '六安市', 5),
(121, '亳州市', 5),
(122, '池州市', 5),
(123, '宣城市', 5),
(124, '巢湖市', 5),
(125, '桐城市', 5),
(126, '天长市', 5),
(127, '明光市', 5),
(128, '界首市', 5),
(129, '宁国市', 5),
(130, '厦门市', 6),
(131, '福州市', 6),
(132, '南平市', 6),
(133, '三明市', 6),
(134, '莆田市', 6),
(135, '泉州市', 6),
(136, '漳州市', 6),
(137, '龙岩市', 6),
(138, '宁德市', 6),
(139, '福清市', 6),
(140, '邵武市', 6),
(141, '武夷山市', 6),
(142, '建瓯市', 6),
(143, '永安市', 6),
(144, '石狮市', 6),
(145, '晋江市', 6),
(146, '南安市', 6),
(147, '龙海市', 6),
(148, '漳平市', 6),
(149, '福安市', 6),
(150, '福鼎市', 6),
(151, '南昌市', 7),
(152, '九江市', 7),
(153, '景德镇市', 7),
(154, '鹰潭市', 7),
(155, '新余市', 7),
(156, '萍乡市', 7),
(157, '赣州市', 7),
(158, '上饶市', 7),
(159, '抚州市', 7),
(160, '宜春市', 7),
(161, '吉安市', 7),
(162, '瑞昌市', 7),
(163, '共青城市', 7),
(164, '庐山市', 7),
(165, '乐平市', 7),
(166, '瑞金市', 7),
(167, '德兴市', 7),
(168, '丰城市', 7),
(169, '樟树市', 7),
(170, '高安市', 7),
(171, '井冈山市', 7),
(172, '贵溪市', 7),
(173, '广州市', 8),
(174, '深圳市', 8),
(175, '清远市', 8),
(176, '韶关市', 8),
(177, '河源市', 8),
(178, '梅州市', 8),
(179, '潮州市', 8),
(180, '汕头市', 8),
(181, '揭阳市', 8),
(182, '汕尾市', 8),
(183, '惠州市', 8),
(184, '东莞市', 8),
(185, '珠海市', 8),
(186, '中山市', 8),
(187, '江门市', 8),
(188, '佛山市', 8),
(189, '肇庆市', 8),
(190, '云浮市', 8),
(191, '阳江市', 8),
(192, '茂名市', 8),
(193, '湛江市', 8),
(194, '英德市', 8),
(195, '连州市', 8),
(196, '乐昌市', 8),
(197, '南雄市', 8),
(198, '兴宁市', 8),
(199, '普宁市', 8),
(200, '陆丰市', 8),
(201, '恩平市', 8),
(202, '台山市', 8),
(203, '开平市', 8),
(204, '鹤山市', 8),
(205, '四会市', 8),
(206, '罗定市', 8),
(207, '阳春市', 8),
(208, '化州市', 8),
(209, '信宜市', 8),
(210, '高州市', 8),
(211, '吴川市', 8),
(212, '廉江市', 8),
(213, '雷州市', 8),
(214, '南宁市', 9),
(215, '桂林市', 9),
(216, '柳州市', 9),
(217, '梧州市', 9),
(218, '贵港市', 9),
(219, '玉林市', 9),
(220, '钦州市', 9),
(221, '北海市', 9),
(222, '防城港市', 9),
(223, '崇左市', 9),
(224, '百色市', 9),
(225, '河池市', 9),
(226, '来宾市', 9),
(227, '贺州市', 9),
(228, '岑溪市', 9),
(229, '桂平市', 9),
(230, '北流市', 9),
(231, '东兴市', 9),
(232, '凭祥市', 9),
(233, '合山市', 9),
(234, '靖西市', 9),
(235, '海口市', 10),
(236, '三亚市', 10),
(237, '三沙市', 10),
(238, '儋州市', 10),
(239, '文昌市', 10),
(240, '琼海市', 10),
(241, '万宁市', 10),
(242, '东方市', 10),
(243, '五指山市', 10),
(244, '郑州市', 11),
(245, '开封市', 11),
(246, '洛阳市', 11),
(247, '平顶山市', 11),
(248, '安阳市', 11),
(249, '鹤壁市', 11),
(250, '新乡市', 11),
(251, '焦作市', 11),
(252, '濮阳市', 11),
(253, '许昌市', 11),
(254, '漯河市', 11),
(255, '三门峡市', 11),
(256, '南阳市', 11),
(257, '商丘市', 11),
(258, '周口市', 11),
(259, '驻马店市', 11),
(260, '信阳市', 11),
(261, '荥阳市', 11),
(262, '新郑市', 11),
(263, '登封市', 11),
(264, '新密市', 11),
(265, '偃师市', 11),
(266, '孟州市', 11),
(267, '沁阳市', 11),
(268, '卫辉市', 11),
(269, '辉县市', 11),
(270, '林州市', 11),
(271, '禹州市', 11),
(272, '长葛市', 11),
(273, '舞钢市', 11),
(274, '义马市', 11),
(275, '灵宝市', 11),
(276, '项城市', 11),
(277, '巩义市', 11),
(278, '邓州市', 11),
(279, '永城市', 11),
(280, '汝州市', 11),
(281, '济源市', 11),
(282, '长沙市', 12),
(283, '衡阳市', 12),
(284, '张家界市', 12),
(285, '常德市', 12),
(286, '益阳市', 12),
(287, '岳阳市', 12),
(288, '株洲市', 12),
(289, '湘潭市', 12),
(290, '郴州市', 12),
(291, '永州市', 12),
(292, '邵阳市', 12),
(293, '怀化市', 12),
(294, '娄底市', 12),
(295, '耒阳市', 12),
(296, '常宁市', 12),
(297, '浏阳市', 12),
(298, '津市市', 12),
(299, '沅江市', 12),
(300, '汨罗市', 12),
(301, '临湘市', 12),
(302, '醴陵市', 12),
(303, '湘乡市', 12),
(304, '韶山市', 12),
(305, '资兴市', 12),
(306, '武冈市', 12),
(307, '洪江市', 12),
(308, '冷水江市', 12),
(309, '涟源市', 12),
(310, '吉首市', 12),
(311, '宁乡市', 12),
(312, '武汉市', 13),
(313, '十堰市', 13),
(314, '襄阳市', 13),
(315, '荆门市', 13),
(316, '孝感市', 13),
(317, '黄冈市', 13),
(318, '鄂州市', 13),
(319, '黄石市', 13),
(320, '咸宁市', 13),
(321, '荆州市', 13),
(322, '宜昌市', 13),
(323, '随州市', 13),
(324, '丹江口市', 13),
(325, '老河口市', 13),
(326, '枣阳市', 13),
(327, '宜城市', 13),
(328, '钟祥市', 13),
(329, '汉川市', 13),
(330, '应城市', 13),
(331, '安陆市', 13),
(332, '广水市', 13),
(333, '麻城市', 13),
(334, '武穴市', 13),
(335, '大冶市', 13),
(336, '赤壁市', 13),
(337, '石首市', 13),
(338, '洪湖市', 13),
(339, '松滋市', 13),
(340, '宜都市', 13),
(341, '枝江市', 13),
(342, '当阳市', 13),
(343, '恩施市', 13),
(344, '利川市', 13),
(345, '仙桃市', 13),
(346, '天门市', 13),
(347, '潜江市', 13),
(348, '北京市', 14),
(349, '天津市', 15),
(350, '石家庄市', 16),
(351, '唐山市', 16),
(352, '秦皇岛市', 16),
(353, '邯郸市', 16),
(354, '邢台市', 16),
(355, '保定市', 16),
(356, '张家口市', 16),
(357, '承德市', 16),
(358, '沧州市', 16),
(359, '廊坊市', 16),
(360, '衡水市', 16),
(361, '辛集市', 16),
(362, '晋州市', 16),
(363, '新乐市', 16),
(364, '遵化市', 16),
(365, '迁安市', 16),
(366, '武安市', 16),
(367, '南宫市', 16),
(368, '沙河市', 16),
(369, '涿州市', 16),
(370, '定州市', 16),
(371, '安国市', 16),
(372, '高碑店市', 16),
(373, '平泉市', 16),
(374, '泊头市', 16),
(375, '任丘市', 16),
(376, '黄骅市', 16),
(377, '河间市', 16),
(378, '霸州市', 16),
(379, '三河市', 16),
(380, '深州市', 16),
(381, '太原市', 17),
(382, '大同市', 17),
(383, '阳泉市', 17),
(384, '长治市', 17),
(385, '晋城市', 17),
(386, '朔州市', 17),
(387, '晋中市', 17),
(388, '运城市', 17),
(389, '忻州市', 17),
(390, '临汾市', 17),
(391, '吕梁市', 17),
(392, '古交市', 17),
(393, '潞城市', 17),
(394, '高平市', 17),
(395, '介休市', 17),
(396, '永济市', 17),
(397, '河津市', 17),
(398, '原平市', 17),
(399, '侯马市', 17),
(400, '霍州市', 17),
(401, '孝义市', 17),
(402, '汾阳市', 17),
(403, '呼和浩特市', 18),
(404, '包头市', 18),
(405, '乌海市', 18),
(406, '赤峰市', 18),
(407, '通辽市', 18),
(408, '鄂尔多斯市', 18),
(409, '呼伦贝尔市', 18),
(410, '巴彦淖尔市', 18),
(411, '乌兰察布市', 18),
(412, '霍林郭勒市', 18),
(413, '满洲里市', 18),
(414, '牙克石市', 18),
(415, '扎兰屯市', 18),
(416, '额尔古纳市', 18),
(417, '根河市', 18),
(418, '丰镇市', 18),
(419, '乌兰浩特市', 18),
(420, '阿尔山市', 18),
(421, '二连浩特市', 18),
(422, '锡林浩特市', 18),
(423, '银川市', 19),
(424, '石嘴山市', 19),
(425, '吴忠市', 19),
(426, '中卫市', 19),
(427, '固原市', 19),
(428, '灵武市', 19),
(429, '青铜峡市', 19),
(430, '西宁市', 20),
(431, '海东市', 20),
(432, '格尔木市', 20),
(433, '德令哈市', 20),
(434, '玉树市', 20),
(435, '西安市', 21),
(436, '延安市', 21),
(437, '铜川市', 21),
(438, '渭南市', 21),
(439, '咸阳市', 21),
(440, '宝鸡市', 21),
(441, '汉中市', 21),
(442, '榆林市', 21),
(443, '商洛市', 21),
(444, '安康市', 21),
(445, '韩城市', 21),
(446, '华阴市', 21),
(447, '兴平市', 21),
(448, '神木市', 21),
(449, '兰州市', 22),
(450, '嘉峪关市', 22),
(451, '金昌市', 22),
(452, '白银市', 22),
(453, '天水市', 22),
(454, '酒泉市', 22),
(455, '张掖市', 22),
(456, '武威市', 22),
(457, '庆阳市', 22),
(458, '平凉市', 22),
(459, '定西市', 22),
(460, '陇南市', 22),
(461, '玉门市', 22),
(462, '敦煌市', 22),
(463, '临夏市', 22),
(464, '合作市', 22),
(465, '乌鲁木齐市', 23),
(466, '克拉玛依市', 23),
(467, '吐鲁番市', 23),
(468, '哈密市', 23),
(469, '喀什市', 23),
(470, '阿克苏市', 23),
(471, '和田市', 23),
(472, '阿图什市', 23),
(473, '阿拉山口市', 23),
(474, '博乐市', 23),
(475, '昌吉市', 23),
(476, '阜康市', 23),
(477, '库尔勒市', 23),
(478, '伊宁市', 23),
(479, '奎屯市', 23),
(480, '塔城市', 23),
(481, '乌苏市', 23),
(482, '阿勒泰市', 23),
(483, '霍尔果斯市', 23),
(484, '石河子市', 23),
(485, '阿拉尔市', 23),
(486, '图木舒克市', 23),
(487, '五家渠市', 23),
(488, '北屯市', 23),
(489, '铁门关市', 23),
(490, '双河市', 23),
(491, '可克达拉市', 23),
(492, '昆玉市', 23),
(493, '成都市', 24),
(494, '广元市', 24),
(495, '绵阳市', 24),
(496, '德阳市', 24),
(497, '南充市', 24),
(498, '广安市', 24),
(499, '遂宁市', 24),
(500, '内江市', 24),
(501, '乐山市', 24),
(502, '自贡市', 24),
(503, '泸州市', 24),
(504, '宜宾市', 24),
(505, '攀枝花市', 24),
(506, '巴中市', 24),
(507, '达州市', 24),
(508, '资阳市', 24),
(509, '眉山市', 24),
(510, '雅安市', 24),
(511, '崇州市', 24),
(512, '邛崃市', 24),
(513, '都江堰市', 24),
(514, '彭州市', 24),
(515, '江油市', 24),
(516, '什邡市', 24),
(517, '广汉市', 24),
(518, '绵竹市', 24),
(519, '阆中市', 24),
(520, '华蓥市', 24),
(521, '峨眉山市', 24),
(522, '万源市', 24),
(523, '简阳市', 24),
(524, '西昌市', 24),
(525, '康定市', 24),
(526, '马尔康市', 24),
(527, '隆昌市', 24),
(528, '重庆市', 27),
(529, '贵阳市', 25),
(530, '六盘水市', 25),
(531, '遵义市', 25),
(532, '安顺市', 25),
(533, '毕节市', 25),
(534, '铜仁市', 25),
(535, '清镇市', 25),
(536, '赤水市', 25),
(537, '仁怀市', 25),
(538, '凯里市', 25),
(539, '都匀市', 25),
(540, '兴义市', 25),
(541, '福泉市', 25),
(542, '盘州市', 25),
(543, '昆明市', 26),
(544, '曲靖市', 26),
(545, '玉溪市', 26),
(546, '丽江市', 26),
(547, '昭通市', 26),
(548, '普洱市', 26),
(549, '临沧市', 26),
(550, '保山市', 26),
(551, '安宁市', 26),
(552, '宣威市', 26),
(553, '芒市', 26),
(554, '瑞丽市', 26),
(555, '大理市', 26),
(556, '楚雄市', 26),
(557, '个旧市', 26),
(558, '开远市', 26),
(559, '蒙自市', 26),
(560, '弥勒市', 26),
(561, '景洪市', 26),
(562, '文山市', 26),
(563, '香格里拉市', 26),
(564, '腾冲市', 26),
(565, '拉萨市', 28),
(566, '日喀则市', 28),
(567, '昌都市', 28),
(568, '林芝市', 28),
(569, '山南市', 28),
(570, '那曲市', 28),
(571, '沈阳市', 29),
(572, '大连市', 29),
(573, '鞍山市', 29),
(574, '抚顺市', 29),
(575, '本溪市', 29),
(576, '丹东市', 29),
(577, '锦州市', 29),
(578, '营口市', 29),
(579, '阜新市', 29),
(580, '辽阳市', 29),
(581, '盘锦市', 29),
(582, '铁岭市', 29),
(583, '朝阳市', 29),
(584, '葫芦岛市', 29),
(585, '新民市', 29),
(586, '瓦房店市', 29),
(587, '庄河市', 29),
(588, '海城市', 29),
(589, '东港市', 29),
(590, '凤城市', 29),
(591, '凌海市', 29),
(592, '北镇市', 29),
(593, '盖州市', 29),
(594, '大石桥市', 29),
(595, '灯塔市', 29),
(596, '调兵山市', 29),
(597, '开原市', 29),
(598, '北票市', 29),
(599, '凌源市', 29),
(600, '兴城市', 29),
(601, '长春市', 30),
(602, '吉林市', 30),
(603, '四平市', 30),
(604, '辽源市', 30),
(605, '通化市', 30),
(606, '白山市', 30),
(607, '松原市', 30),
(608, '白城市', 30),
(609, '榆树市', 30),
(610, '德惠市', 30),
(611, '蛟河市', 30),
(612, '桦甸市', 30),
(613, '舒兰市', 30),
(614, '磐石市', 30),
(615, '公主岭市', 30),
(616, '双辽市', 30),
(617, '梅河口市', 30),
(618, '集安市', 30),
(619, '洮南市', 30),
(620, '大安市', 30),
(621, '临江市', 30),
(622, '延吉市', 30),
(623, '图们市', 30),
(624, '敦化市', 30),
(625, '珲春市', 30),
(626, '龙井市', 30),
(627, '和龙市', 30),
(628, '扶余市', 30),
(629, '哈尔滨市', 31),
(630, '齐齐哈尔市', 31),
(631, '黑河市', 31),
(632, '大庆市', 31),
(633, '伊春市', 31),
(634, '鹤岗市', 31),
(635, '佳木斯市', 31),
(636, '双鸭山市', 31),
(637, '七台河市', 31),
(638, '鸡西市', 31),
(639, '牡丹江市', 31),
(640, '绥化市', 31),
(641, '尚志市', 31),
(642, '五常市', 31),
(643, '讷河市', 31),
(644, '北安市', 31),
(645, '五大连池市', 31),
(646, '铁力市', 31),
(647, '同江市', 31),
(648, '富锦市', 31),
(649, '虎林市', 31),
(650, '密山市', 31),
(651, '绥芬河市', 31),
(652, '海林市', 31),
(653, '宁安市', 31),
(654, '安达市', 31),
(655, '肇东市', 31),
(656, '海伦市', 31),
(657, '穆棱市', 31),
(658, '东宁市', 31),
(659, '抚远市', 31),
(660, '香港特别行政区', 32),
(661, '澳门特别行政区', 33),
(662, '台北市', 34),
(663, '新北市', 34),
(664, '桃园市', 34),
(665, '台中市', 34),
(666, '台南市', 34),
(667, '高雄市', 34),
(668, '基隆市', 34),
(669, '新竹市', 34),
(670, '嘉义市', 34);

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
  `last_login` timestamp NULL DEFAULT NULL,
  `ip` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `password`, `admin_level`, `last_login`, `ip`) VALUES
(1, '许诺', 'xunuo@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2017-10-24 23:13:26', '10.240.1.173'),
(2, '韩露阳', 'han@hotmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 3, '2017-10-21 02:34:44', '10.240.1.64'),
(3, '乔粤', '', '', 0, NULL, NULL),
(4, '孙浩棠', '', '', 0, NULL, NULL),
(5, '张翊人', '', '', 0, NULL, NULL),
(6, '宋海培', '', '', 0, NULL, NULL),
(7, 'Sam', 'weisen.li@hotmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 2, '2017-10-24 20:10:55', '10.240.1.19'),
(8, 'Sam Li', 'liweisen007@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 3, '2017-10-24 19:36:07', '10.240.1.60');

-- --------------------------------------------------------

--
-- Table structure for table `employees_material`
--

CREATE TABLE IF NOT EXISTS `employees_material` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(225) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `employees_material`
--

INSERT INTO `employees_material` (`id`, `name`) VALUES
(1, '张翊人-RCIRC'),
(2, '张丽'),
(3, '宋海培-Paralegal');

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
  `employee_id` int(11) NOT NULL,
  `employee_material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `performances`
--

INSERT INTO `performances` (`id`, `student_id`, `service_id`, `sub_service_id`, `fee`, `progress_id`, `commission_progress_id`, `employee_id`, `employee_material_id`) VALUES
(1, 1, 1, 1, 3000, 2, 7, 1, 2),
(3, 1, 1, 3, 5000, 5, 3, 1, 1),
(4, 1, 2, 7, 10000, 2, 7, 1, 3),
(6, 2, 2, 13, 3533, 4, 3, 1, 2),
(7, 3, 2, 8, 3444, 4, 3, 1, 3),
(8, 2, 2, 11, 2345, 1, 3, 3, 1),
(9, 3, 1, 3, 6789, 2, 2, 3, 2),
(10, 3, 3, 72, 34567, 2, 2, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `post_graduate_applications`
--

CREATE TABLE IF NOT EXISTS `post_graduate_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `ouac_account` varchar(225) NOT NULL,
  `ouac_password` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `email_password` varchar(225) NOT NULL,
  `service_fee` float NOT NULL,
  `commission_progress_id` int(11) NOT NULL,
  `schools` text NOT NULL,
  `employee_id` int(11) NOT NULL,
  `employee_material_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='101 105 school applications' AUTO_INCREMENT=3 ;

--
-- Dumping data for table `post_graduate_applications`
--

INSERT INTO `post_graduate_applications` (`id`, `student_id`, `service_id`, `ouac_account`, `ouac_password`, `email`, `email_password`, `service_fee`, `commission_progress_id`, `schools`, `employee_id`, `employee_material_id`) VALUES
(1, 3, 5, '1231', '123123', 'weisen.li@hotmail.com', 'aksljf', 3000, 9, '[{"sub_service_id":"31","sub_service_name":"University Of Waterloo","application_fee":"4000","student_number":"302340","account":"23402394q0234","password":"2309234","progress_id":"4","progress_name":"催缴学费","submit_date":"2017-10-27","trace_number":"111111"},{"sub_service_id":"28","sub_service_name":"Ryerson University","application_fee":"2000","student_number":"ASDFASDF","account":"ASDFAS","password":"ASDFASDF","progress_id":"1","progress_name":"材料欠缺","trace_number":"234134","submit_date":"2017-10-19"}]', 2, 1),
(2, 3, 5, 'jsdjfdj', 'lsdljfj', 'liweisen007@gmail.com', 'klsajdflj', 38383, 8, '[{"sub_service_id":"26","sub_service_name":"York University","application_fee":"83838","student_number":"802398","account":"923849","password":"0923840","progress_id":"3","progress_name":"Offer获得","submit_date":"2017-10-19"},{"sub_service_id":"43","sub_service_name":"Laurentian University","application_fee":"35345","student_number":"345345","account":"235235","password":"3567356","progress_id":"4","progress_name":"催缴学费","trace_number":"","submit_date":"2017-10-24"}]', 3, 2);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=36 ;

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
(34, '台湾', 8),
(35, '上海市', 3);

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
  `employee_material_id` int(11) NOT NULL COMMENT '责任文案',
  `high_info` varchar(225) NOT NULL COMMENT '中国高中信息',
  `uni_info` varchar(225) NOT NULL COMMENT '中国大学信息',
  `visa_info` varchar(225) NOT NULL COMMENT '签证信息',
  `visa_date` date NOT NULL,
  `passport_date` date NOT NULL,
  `phone` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `service` varchar(225) NOT NULL,
  `service_fee` float NOT NULL,
  `school` varchar(225) NOT NULL,
  `progress` varchar(225) NOT NULL,
  `office_id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `username`, `password`, `gender`, `dob`, `region_id`, `province_id`, `city_id`, `employee_id`, `employee_material_id`, `high_info`, `uni_info`, `visa_info`, `visa_date`, `passport_date`, `phone`, `email`, `service`, `service_fee`, `school`, `progress`, `office_id`, `agency_id`, `updated_at`) VALUES
(1, 'WEISEN LI', '', '', '男', '1996-02-14', 5, 20, 432, 2, 1, 'high school', 'Canada', 'study permit', '2018-02-08', '2018-02-08', '5468975214', 'weisen.li@hotmail.com', '签证申请', 300, '', '签证获批', 4, 1, '2017-10-24 01:52:35'),
(2, 'Sam', '', '', '男', '1990-01-02', 2, 8, 200, 1, 2, '二中', '韶关', '学签', '2017-12-12', '2019-02-12', '22222222', 'sam.li@hotmail.com', '免费学校申请', 3533, '', '催缴学费', 1, 1, '2017-10-21 17:52:01'),
(3, 'Mandy', '', '', '女', '1993-01-23', 7, 30, 603, 3, 2, '社会高中', '社会大学', '工作签证', '2017-12-23', '2019-09-26', '324234234', 'mandy@gmail.com', '收费学校申请101', 38383, '', 'Offer获得', 5, 1, '2017-10-24 19:57:51'),
(4, 'SU LING ZHOU', NULL, NULL, '女', '1972-10-19', 4, 15, 349, 0, 0, 'high school', 'Canada', '学签', '2017-10-04', '2017-11-15', '23456754432', 'liweisen007@gmail.com', '', 0, '', '', 1, 1, '2017-10-22 19:53:57'),
(5, '王尼玛', NULL, NULL, '男', '2010-09-16', 2, 9, 216, 0, 0, '鬼知道', '没有上吧', '工作签证', '2017-12-28', '2018-03-24', '8746574821', 'nima@nima.com', '', 0, '', '', 8, 1, '2017-10-24 13:20:58'),
(6, '马云', NULL, NULL, '男', '1976-04-09', 6, 26, 544, 0, 0, '不知道', '我也不知道', '旅游签证', '2018-02-23', '2019-03-30', '45434534545', 'mayun@mail.com', '', 0, '', '', 1, 1, '2017-10-24 13:28:22');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=74 ;

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
(70, '挂靠', 0, 0, 0, 9),
(71, 'SEC', 0, 0, 0, 3),
(72, 'ESC', 0, 0, 0, 3),
(73, 'ILAC', 0, 0, 0, 3);

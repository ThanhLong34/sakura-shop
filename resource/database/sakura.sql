-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 03:54 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sakura`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `username`, `password`, `email`, `phoneNumber`) VALUES
(1, '10:58:48 06/04/2023', '14:34:38 14/04/2023', NULL, 'dragondev0304', '4c79273eed3d095e55d1224f6524ae92', 'thanhlongedu0304@gmail.com', '0353292241'),
(4, '13:44:55 06/04/2023', '14:18:16 06/04/2023', NULL, 'tester01', '5a734ecdd0295bfc196a1d740bf3921f', 'thanhlongedu0304@gmail.com', '0123456789'),
(5, '13:45:00 06/04/2023', '16:09:26 07/04/2023', NULL, 'tester02', '0192023a7bbd73250516f069df18b500', 'nguyenlong0304tester2@gmail.com', '0123456789');

-- --------------------------------------------------------

--
-- Table structure for table `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `videoUrl` varchar(1000) DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `healthReward` int(11) DEFAULT 0,
  `starReward` int(11) DEFAULT 0,
  `diamondReward` int(11) DEFAULT 0,
  `advertisementTypeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `advertisementtype`
--

CREATE TABLE `advertisementtype` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `isRight` tinyint(1) NOT NULL DEFAULT 0,
  `questionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `content`, `isRight`, `questionId`) VALUES
(21, '20:43:08 14/04/2023', NULL, NULL, '24 tháng', 1, 1),
(22, '20:43:13 14/04/2023', NULL, NULL, '8 tháng', 0, 1),
(23, '20:43:19 14/04/2023', NULL, NULL, '12 tháng', 0, 1),
(24, '20:43:28 14/04/2023', NULL, NULL, '30 tháng', 0, 1),
(25, '20:44:35 14/04/2023', NULL, NULL, '3 - 5 tháng', 0, 2),
(26, '20:44:38 14/04/2023', NULL, NULL, '8 - 12 tháng', 1, 2),
(27, '20:44:42 14/04/2023', NULL, NULL, '15 - 17 tháng', 0, 2),
(28, '20:44:45 14/04/2023', NULL, NULL, '20 - 24 tháng', 0, 2),
(33, '20:51:20 14/04/2023', NULL, NULL, 'L’Oreal', 1, 8),
(34, '20:51:23 14/04/2023', NULL, NULL, 'Hermès', 0, 8),
(35, '20:51:27 14/04/2023', NULL, NULL, 'Guerlain', 0, 8),
(36, '20:51:30 14/04/2023', NULL, NULL, 'YSL', 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `healthReward` int(11) DEFAULT 0,
  `starReward` int(11) DEFAULT 0,
  `diamondReward` int(11) DEFAULT 0,
  `topicId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `imageId`, `title`, `brand`, `healthReward`, `starReward`, `diamondReward`, `topicId`) VALUES
(1, '09:59:46 13/04/2023', NULL, NULL, 16, 'Sức khỏe', NULL, 3, 0, 0, 1),
(3, '10:13:28 13/04/2023', '14:49:40 13/04/2023', NULL, 24, 'Sao', '', 0, 3, 0, 1),
(5, '14:09:42 13/04/2023', '14:50:03 13/04/2023', NULL, 25, 'Kim cương', '', 0, 0, 1, 1),
(8, '14:51:57 13/04/2023', '12:16:19 14/04/2023', NULL, 45, 'Son abc', 'Son Sakura', 0, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `gift`
--

CREATE TABLE `gift` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `starCost` int(11) DEFAULT 0,
  `diamondCost` int(11) DEFAULT 0,
  `allowToReceiveOnline` tinyint(1) DEFAULT 0,
  `isShow` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gift`
--

INSERT INTO `gift` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `imageId`, `name`, `brand`, `description`, `starCost`, `diamondCost`, `allowToReceiveOnline`, `isShow`) VALUES
(4, '15:18:59 13/04/2023', NULL, NULL, 27, 'Mứt dâu', '', '', 120, 0, 0, 0),
(5, '15:20:11 13/04/2023', NULL, NULL, 28, 'Yomost cam', 'Yomost', 'Hương cam', 250, 0, 1, 1),
(6, '15:20:35 13/04/2023', NULL, NULL, 29, 'Yomost việt quất', 'Yomost', 'Hương viết quất', 0, 3, 1, 1),
(7, '11:17:32 14/04/2023', '12:12:52 14/04/2023', NULL, 42, 'Yomost lựu đỏ', 'Yomost', 'Hương lựu đỏ', 300, 0, 1, 1),
(9, '14:39:53 14/04/2023', '14:52:35 14/04/2023', NULL, 53, 'Yomost dâu', 'Yomost', 'Hương dâu tây', 202, 5, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `size` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `link`, `filename`, `size`) VALUES
(1, '10:52:15 11/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6434d96f305ea.png', 'imagefile6434d96f305ea.png', 9893),
(2, '10:52:52 11/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6434d994ba712.png', 'imagefile6434d994ba712.png', 17903),
(16, '09:57:35 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile64376f9fd3d24.png', 'imagefile64376f9fd3d24.png', 9660),
(18, '10:07:41 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile643771fdc31f7.png', 'imagefile643771fdc31f7.png', 38968),
(24, '14:49:40 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6437b41407f43.png', 'imagefile6437b41407f43.png', 11548),
(25, '14:50:01 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6437b42942b39.png', 'imagefile6437b42942b39.png', 11492),
(27, '15:16:20 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6437ba54917bf.png', 'imagefile6437ba54917bf.png', 116809),
(28, '15:20:03 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6437bb33a03a4.png', 'imagefile6437bb33a03a4.png', 228661),
(29, '15:20:33 13/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6437bb513c765.png', 'imagefile6437bb513c765.png', 245066),
(42, '12:12:51 14/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6438e0d374b91.png', 'imagefile6438e0d374b91.png', 242887),
(45, '12:15:54 14/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6438e18a02efb.png', 'imagefile6438e18a02efb.png', 73137),
(53, '14:41:02 14/04/2023', NULL, NULL, 'http://localhost/projects/sakura/upload/images/imagefile6439038e3abea.png', 'imagefile6439038e3abea.png', 237473);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `levelNumber` int(11) NOT NULL,
  `experienceRequired` int(11) NOT NULL,
  `healthReward` int(11) NOT NULL DEFAULT 0,
  `starReward` int(11) DEFAULT 0,
  `diamondReward` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `levelNumber`, `experienceRequired`, `healthReward`, `starReward`, `diamondReward`) VALUES
(1, '21:13:00 07/04/2023', '14:36:52 14/04/2023', NULL, 2, 122, 1, 3, 1),
(2, '21:13:31 07/04/2023', NULL, NULL, 3, 250, 0, 10, 0),
(3, '21:13:53 07/04/2023', NULL, NULL, 4, 350, 0, 12, 0),
(4, '21:14:03 07/04/2023', NULL, NULL, 5, 500, 0, 15, 0),
(6, '21:19:47 10/04/2023', NULL, NULL, 6, 600, 0, 0, 0),
(7, '21:20:35 10/04/2023', NULL, NULL, 7, 750, 2, 5, 1),
(8, '21:21:00 10/04/2023', NULL, NULL, 8, 820, 2, 2, 1),
(9, '21:21:15 10/04/2023', NULL, NULL, 9, 950, 3, 2, 2),
(10, '21:21:30 10/04/2023', NULL, NULL, 10, 1020, 2, 2, 2),
(11, '21:21:39 10/04/2023', '10:24:05 11/04/2023', NULL, 11, 1235, 3, 2, 3),
(12, '21:21:51 10/04/2023', NULL, NULL, 12, 1300, 2, 1, 2),
(13, '21:22:01 10/04/2023', NULL, NULL, 13, 1350, 2, 1, 2),
(14, '10:25:05 11/04/2023', '17:48:19 12/04/2023', NULL, 14, 1450, 3, 2, 1),
(15, '14:37:07 14/04/2023', '14:37:15 14/04/2023', NULL, 15, 1550, 1, 1, 1),
(16, '14:37:23 14/04/2023', NULL, NULL, 16, 1680, 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `lockedAt` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `health` int(11) DEFAULT 3,
  `star` int(11) DEFAULT 0,
  `diamond` int(11) DEFAULT 0,
  `experience` int(11) DEFAULT 0,
  `level` int(11) DEFAULT 1,
  `activeOptionMode` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `lockedAt`, `phoneNumber`, `password`, `email`, `nickname`, `health`, `star`, `diamond`, `experience`, `level`, `activeOptionMode`) VALUES
(5, '20:05:31 07/04/2023', NULL, NULL, NULL, '0353292241', '4c79273eed3d095e55d1224f6524ae92', 'thanhlongedu0304@gmail.com', 'player_yP7Ty2', 3, 0, 0, 0, 1, 1),
(6, '20:05:52 07/04/2023', NULL, NULL, NULL, '0123456789', '4c79273eed3d095e55d1224f6524ae92', '2014468@dlu.edu.vn', 'player_eECGaf', 3, 0, 0, 0, 1, 0),
(7, '20:06:33 07/04/2023', NULL, NULL, NULL, '0123456781', '4c79273eed3d095e55d1224f6524ae92', 'nguyenlong0304tester1@gmail.com', 'player_YzvXFT', 3, 0, 0, 0, 1, 0),
(8, '20:06:37 07/04/2023', '20:32:19 07/04/2023', NULL, NULL, '0123456782', '4c79273eed3d095e55d1224f6524ae92', 'nguyenlong0304tester2@gmail.com', 'player_op7UUD', 5, 5, 2, 102, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `content` varchar(1000) NOT NULL,
  `healthReward` int(11) DEFAULT 0,
  `starReward` int(11) DEFAULT 0,
  `diamondReward` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `content`, `healthReward`, `starReward`, `diamondReward`) VALUES
(1, '13:45:10 14/04/2023', '20:42:14 14/04/2023', NULL, 'Sau khi mở nắp thì son dạng thỏi có thể sử dụng an toàn trong khoảng thời gian bao lâu?', 2, 0, 0),
(2, '13:46:07 14/04/2023', '20:44:16 14/04/2023', NULL, 'Vậy còn đối với son dạng kem, dạng nước thì bạn nên dùng trong bao lâu sau khi mở nắp?', 3, 0, 0),
(8, '20:50:53 14/04/2023', NULL, NULL, 'Đố bạn biết, thỏi son đắt nhất thế giới hiện tại đến từ thương hiệu nào?', 3, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rewardhistory`
--

CREATE TABLE `rewardhistory` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `giftId` int(11) DEFAULT NULL,
  `playerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `id` int(11) NOT NULL,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`id`, `createdAt`, `updatedAt`, `deletedAt`, `imageId`, `name`) VALUES
(1, '10:07:42 13/04/2023', NULL, NULL, 18, 'Phần thưởng trong lượt chơi'),
(3, '10:52:40 11/04/2023', NULL, NULL, 1, 'Son môi'),
(4, '10:53:33 11/04/2023', NULL, NULL, 2, 'Giày Sneaker');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `advertisementTypeId` (`advertisementTypeId`);

--
-- Indexes for table `advertisementtype`
--
ALTER TABLE `advertisementtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topicId` (`topicId`);

--
-- Indexes for table `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link` (`link`),
  ADD UNIQUE KEY `filename` (`filename`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `levelNumber` (`levelNumber`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phoneNumber`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rewardhistory`
--
ALTER TABLE `rewardhistory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `giftId` (`giftId`),
  ADD KEY `playerId` (`playerId`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `advertisementtype`
--
ALTER TABLE `advertisementtype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `rewardhistory`
--
ALTER TABLE `rewardhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `advertisement`
--
ALTER TABLE `advertisement`
  ADD CONSTRAINT `advertisement_ibfk_1` FOREIGN KEY (`advertisementTypeId`) REFERENCES `advertisementtype` (`id`);

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`);

--
-- Constraints for table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`topicId`) REFERENCES `topic` (`id`);

--
-- Constraints for table `rewardhistory`
--
ALTER TABLE `rewardhistory`
  ADD CONSTRAINT `rewardhistory_ibfk_1` FOREIGN KEY (`giftId`) REFERENCES `gift` (`id`),
  ADD CONSTRAINT `rewardhistory_ibfk_2` FOREIGN KEY (`playerId`) REFERENCES `player` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

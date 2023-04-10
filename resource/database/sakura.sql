-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2023 at 04:24 PM
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
(1, '10:58:48 06/04/2023', '21:06:48 10/04/2023', NULL, 'dragondev0304', '4c79273eed3d095e55d1224f6524ae92', 'thanhlongedu0304@gmail.com', '0353292241'),
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
  `title` varchar(1000) NOT NULL,
  `questionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `starCost` int(11) DEFAULT 0,
  `diamondCost` int(11) DEFAULT 0,
  `allowToReceiveOnline` tinyint(1) DEFAULT 0,
  `isShow` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, '21:13:00 07/04/2023', NULL, NULL, 2, 120, 0, 5, 0),
(2, '21:13:31 07/04/2023', NULL, NULL, 3, 250, 0, 10, 0),
(3, '21:13:53 07/04/2023', NULL, NULL, 4, 350, 0, 12, 0),
(4, '21:14:03 07/04/2023', NULL, NULL, 5, 500, 0, 15, 0),
(6, '21:19:47 10/04/2023', NULL, NULL, 6, 600, 0, 0, 0),
(7, '21:20:35 10/04/2023', NULL, NULL, 7, 750, 2, 5, 1),
(8, '21:21:00 10/04/2023', NULL, NULL, 8, 820, 2, 2, 1),
(9, '21:21:15 10/04/2023', NULL, NULL, 9, 950, 3, 2, 2),
(10, '21:21:30 10/04/2023', NULL, NULL, 10, 1020, 2, 2, 2),
(11, '21:21:39 10/04/2023', NULL, NULL, 11, 1200, 2, 2, 1),
(12, '21:21:51 10/04/2023', NULL, NULL, 12, 1300, 2, 1, 2),
(13, '21:22:01 10/04/2023', NULL, NULL, 13, 1350, 2, 1, 2);

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
  `title` varchar(1000) NOT NULL,
  `rightAnswerId` int(11) DEFAULT NULL,
  `healthReward` int(11) DEFAULT 0,
  `starReward` int(11) DEFAULT 0,
  `diamondReward` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `rightAnswerId` (`rightAnswerId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rewardhistory`
--
ALTER TABLE `rewardhistory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`rightAnswerId`) REFERENCES `answer` (`id`);

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

CREATE TABLE `Admin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
);

CREATE TABLE `Image` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `size` int NOT NULL
);

CREATE TABLE `Player` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `lockedAt` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `star` int DEFAULT 0,
  `diamond` int DEFAULT 0,
  `experience` int DEFAULT 0,
  `level` int DEFAULT 0,
  `activeModeOption` bool DEFAULT 0,
  `activeModeRankOfWeek` bool DEFAULT 0,
  `scoreOfWeek` int DEFAULT 0
);

CREATE TABLE `Topic` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
);

CREATE TABLE `Card` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `valueStar` int DEFAULT 0,
  `valueDiamond` int DEFAULT 0,
  `topicId` int
);

CREATE TABLE `GiftType` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Gift` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `imageId` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `starCost` int DEFAULT 0,
  `diamondCost` int DEFAULT 0,
  `allowToReceiveOnline` bool DEFAULT 0,
  `isShow` bool DEFAULT 1,
  `giftTypeId` int
);

CREATE TABLE `Player_Gift` (
  `playerId` int,
  `giftId` int,
  `amount` int DEFAULT 1
);

CREATE TABLE `RewardHistory` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `giftId` int
);

CREATE TABLE `WeeklyRanking` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `weekNumber` int NOT NULL,
  `giftOfPlayerTop1` int,
  `giftOfPlayerTop2` int,
  `giftOfPlayerTop3` int
);

CREATE TABLE `WeeklyRankingReport` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `playerId` int,
  `scoreOfWeek` int NOT NULL,
  `topNumber` int NOT NULL,
  `weeklyRankingId` int
);

CREATE TABLE `Answer` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `title` varchar(1000) NOT NULL,
  `questionId` int
);

CREATE TABLE `Question` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `title` varchar(1000) NOT NULL,
  `rightAnswerId` int,
  `valueStar` int DEFAULT 0,
  `valueDiamond` int DEFAULT 0
);

CREATE TABLE `AdvertisementType` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL
);

CREATE TABLE `Advertisement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int NOT NULL,
  `valueStar` int DEFAULT 0,
  `valueDiamond` int DEFAULT 0,
  `advertisementTypeId` int
);

ALTER TABLE `Card` ADD FOREIGN KEY (`topicId`) REFERENCES `Topic` (`id`);

ALTER TABLE `Gift` ADD FOREIGN KEY (`giftTypeId`) REFERENCES `GiftType` (`id`);

ALTER TABLE `Player_Gift` ADD FOREIGN KEY (`playerId`) REFERENCES `Player` (`id`);

ALTER TABLE `Player_Gift` ADD FOREIGN KEY (`giftId`) REFERENCES `Gift` (`id`);

ALTER TABLE `RewardHistory` ADD FOREIGN KEY (`giftId`) REFERENCES `Gift` (`id`);

ALTER TABLE `WeeklyRanking` ADD FOREIGN KEY (`giftOfPlayerTop1`) REFERENCES `Gift` (`id`);

ALTER TABLE `WeeklyRanking` ADD FOREIGN KEY (`giftOfPlayerTop2`) REFERENCES `Gift` (`id`);

ALTER TABLE `WeeklyRanking` ADD FOREIGN KEY (`giftOfPlayerTop3`) REFERENCES `Gift` (`id`);

ALTER TABLE `WeeklyRankingReport` ADD FOREIGN KEY (`playerId`) REFERENCES `Player` (`id`);

ALTER TABLE `WeeklyRankingReport` ADD FOREIGN KEY (`weeklyRankingId`) REFERENCES `WeeklyRanking` (`id`);

ALTER TABLE `Answer` ADD FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`);

ALTER TABLE `Question` ADD FOREIGN KEY (`rightAnswerId`) REFERENCES `Answer` (`id`);

ALTER TABLE `Advertisement` ADD FOREIGN KEY (`advertisementTypeId`) REFERENCES `AdvertisementType` (`id`);

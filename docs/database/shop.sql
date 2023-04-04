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
  `health` int DEFAULT 1,
  `star` int DEFAULT 0,
  `diamond` int DEFAULT 0,
  `experience` int DEFAULT 0,
  `level` int DEFAULT 0,
  `activeModeOption` bool DEFAULT 0
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
  `healthReward` int DEFAULT 0,
  `starReward` int DEFAULT 0,
  `diamondReward` int DEFAULT 0,
  `topicId` int
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
  `isShow` bool DEFAULT 1
);

CREATE TABLE `Level` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `levelNumber` int NOT NULL,
  `starReward` int DEFAULT 0,
  `diamondReward` int DEFAULT 0
);

CREATE TABLE `RewardHistory` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `giftId` int,
  `playerId` int
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
  `healthReward` int DEFAULT 0,
  `starReward` int DEFAULT 0,
  `diamondReward` int DEFAULT 0
);

CREATE TABLE `AdvertisementType` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Advertisement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `createdAt` varchar(255) DEFAULT NULL,
  `updatedAt` varchar(255) DEFAULT NULL,
  `deletedAt` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` int NOT NULL,
  `healthReward` int DEFAULT 0,
  `starReward` int DEFAULT 0,
  `diamondReward` int DEFAULT 0,
  `advertisementTypeId` int
);

ALTER TABLE `Card` ADD FOREIGN KEY (`topicId`) REFERENCES `Topic` (`id`);

ALTER TABLE `RewardHistory` ADD FOREIGN KEY (`giftId`) REFERENCES `Gift` (`id`);

ALTER TABLE `RewardHistory` ADD FOREIGN KEY (`playerId`) REFERENCES `Player` (`id`);

ALTER TABLE `Answer` ADD FOREIGN KEY (`questionId`) REFERENCES `Question` (`id`);

ALTER TABLE `Question` ADD FOREIGN KEY (`rightAnswerId`) REFERENCES `Answer` (`id`);

ALTER TABLE `Advertisement` ADD FOREIGN KEY (`advertisementTypeId`) REFERENCES `AdvertisementType` (`id`);

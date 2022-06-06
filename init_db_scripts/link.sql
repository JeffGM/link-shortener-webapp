CREATE TABLE `link` (
  `id` int NOT NULL AUTO_INCREMENT,
  `originalUrl` varchar(500) NOT NULL UNIQUE,
  `shortenedUrl` varchar(500) NOT NULL UNIQUE,
  `owner` varchar(45) NOT NULL,
  `activated` varchar(5) NOT NULL,
  `numberOfClicks` int DEFAULT NULL,
  `profit` decimal(19, 4) DEFAULT NULL,
  `ad` int DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `expirationDate` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
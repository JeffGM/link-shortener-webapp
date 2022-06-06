CREATE TABLE `ad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `base64Image` text NOT NULL,
  `costPerView` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `contributions` (
	`spotify_id` varchar(62) NOT NULL,
	`email` varchar(256) NOT NULL,
	`review_sent` boolean DEFAULT false,
	`status` enum('To be reviewed','Approved','Rejected') DEFAULT 'To be reviewed',
	`feedback` text,
	`likes` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `contributions_spotify_id` PRIMARY KEY(`spotify_id`)
);

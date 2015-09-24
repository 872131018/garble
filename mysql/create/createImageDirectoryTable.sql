CREATE TABLE IF NOT EXISTS Garble.imageDirectory
(
	id	INT NOT NULL AUTO_INCREMENT,
	username	VARCHAR(24) NOT NULL,
	imageAt	VARCHAR(128) NOT NULL,
	postedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);
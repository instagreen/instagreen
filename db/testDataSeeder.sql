-- DUMMY IMAGE: 
-- https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450
-- https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg

USE instagreen;

-- Add dummy users
INSERT INTO users (username, password, follower_count, following_count) VALUES ('antonio', 'testpassword', 0, 0);
INSERT INTO users (username, password, follower_count, following_count) VALUES ('brian', 'testpassword', 0, 0);
INSERT INTO users (username, password, follower_count, following_count) VALUES ('arthur', 'testpassword', 0, 0);
INSERT INTO users (username, password, follower_count, following_count) VALUES ('masterChief', 'testpassword', 0, 0);
INSERT INTO users (username, password, follower_count, following_count) VALUES ('bowser', 'testpassword', 0, 0);

-- add Pending follower requests
-- antonio sends brian a follow request
INSERT INTO user_target_relation (user_id, target_id, isAccepted) VALUES
  (1, 2, 0);

-- antonio sends masterChief a follow request
INSERT INTO user_target_relation (user_id, target_id, isAccepted) VALUES
  (1, 4, 0);

-- antonio sends arthur a follow request
INSERT INTO user_target_relation (user_id, target_id, isAccepted) VALUES
  (1, 3, 0);

-- masterChief accepts request
UPDATE user_target_relation SET isAccepted = 1
WHERE user_id = 1
AND target_id = 4;

UPDATE users SET follower_count = follower_count + 1
WHERE id = 4;
UPDATE users SET following_count = following_count + 1
WHERE id = 1;

-- masterChief sends antonio a follow request
INSERT INTO user_target_relation (user_id, target_id, isAccepted) VALUES
  (4, 1, 0);

-- antonio accepts request
UPDATE user_target_relation SET isAccepted = 1
WHERE user_id = 4
AND target_id = 1;

UPDATE users SET follower_count = follower_count + 1
WHERE id = 1;
UPDATE users SET following_count = following_count + 1
WHERE id = 4;

-- brian accepts request
UPDATE user_target_relation SET isAccepted = 1
WHERE user_id = 1
AND target_id = 2;

UPDATE users SET follower_count = follower_count + 1
WHERE id = 2;
UPDATE users SET following_count = following_count + 1
WHERE id = 1;

-- add dummy posts

-- ANTONIO
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- BRIAN
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- ARTHUR
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- MASTER CHIEF
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- BOWSER
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'https://www.telegraph.co.uk/content/dam/films/2017/09/08/TELEMMGLPICT000139255438_trans_NvBQzQNjv4BqK2NjVBvaLbEUYr5Zhj8etX9NBJbfJ4XWKGgc5tcZdVg.jpeg?imwidth=450', 
'this is a description of the picture. lorem ipsum and such...', 0);

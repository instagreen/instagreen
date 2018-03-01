-- DUMMY IMAGE: 
-- http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png

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

-- masterChief sends antonio a follow request
INSERT INTO user_target_relation (user_id, target_id, isAccepted) VALUES
  (4, 1, 0);

-- antonio accepts request
UPDATE user_target_relation SET isAccepted = 1
WHERE user_id = 4
AND target_id = 1;

-- brian accepts request
UPDATE user_target_relation SET isAccepted = 1
WHERE user_id = 1
AND target_id = 2;

-- add dummy posts

-- ANTONIO
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (1, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- BRIAN
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (2, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- ARTHUR
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (3, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- MASTER CHIEF
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (4, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

-- BOWSER
INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

INSERT INTO posts (user_id, imgUrl, description, likes_count)
VALUES (5, 
'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png', 
'this is a description of the picture. lorem ipsum and such...', 0);

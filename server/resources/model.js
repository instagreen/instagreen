const { password } = require('../../db/config.example.js');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password,
    database: 'instagreen',
    charset: 'utf8',
  },
});

// Put all db queries here
module.exports.addPostToDb = (body, callback) => {
  knex('posts')
    .insert({
      likes_count: 0,
      description: body.description,
      imgUrl: body.imgUrl,
      user_id: body.user_id,
    })
    .then(id => knex('posts').select().where('id', id))
    .then(callback);
};

module.exports.addCommentToDb = (body, callback) => {
  knex('comments')
    .insert({
      text: body.text,
      user_id: body.user_id,
      post_id: body.post_id,
    })
    .then(id => knex('comments').select().where('id', id))
    .then(callback);
};

module.exports.handleNewLike = (body, callback) => {
  knex('likes')
    .select()
    .where({
      user_id: body.user_id,
      post_id: body.post_id,
    })
    .then((entry) => {
      // if a record in likes table DOES NOT contain user_id and post_id
      if (!entry.length) {
        knex('likes')
          // add a new like record in the likes database
          .insert({
            user_id: body.user_id,
            post_id: body.post_id,
          })
          .then(id => knex('likes').select().where('id', id))
          .then(callback);

        // increment likes_count of the post in the posts table
        knex('posts').where({ id: body.post_id })
          .increment('likes_count', 1)
          .then(() => console.log('Testing'));
      } else {
        callback({ message: 'user already liked' });
      }
    });
};

module.exports.handleFollowRequest = (body, callback) => {
  knex('user_target_relation')
    .select()
    .where({
      user_id: body.user_id,
      target_id: body.target_id,
    })
    .then((entry) => {
      if (!entry.length) {
        knex('user_target_relation')
          .insert({
            user_id: body.user_id,
            target_id: body.target_id,
            isAccepted: false,
          })
          .then(id => knex('user_target_relation').select().where('id', id))
          .then(callback);
      } else {
        callback({ message: 'user already requested follow' });
      }
    });
};

module.exports.handleFollowAccept = (body, callback) => {

};

module.exports.handleFollowDecline = (body, callback) => {

};

module.exports.test = (body, callback) => {
  // WRONG
  callback(body);
};

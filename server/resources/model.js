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
  useNullAsDefault: true,
});

// ===========feed
module.exports.getFeed = (user_id, cb) => { // user_id the owner of the profile
  // find the people I follow
  knex('user_target_relation').where({
    user_id, // user_id : user_id ES6 style
    isAccepted: true,

  }).select('target_id').then((peopleUserFollows) => {
    // find the posts of the people i follow (feed)
    // ES6 arroy function
    const peopleUserFollowsIds = peopleUserFollows.map(record => record.target_id);
    knex('posts')
      .whereIn('user_id', peopleUserFollowsIds).then((feed) => {
        cb(feed);
      });
  });
};

module.exports.getPersonalPosts = (user_id, cb) => { // user_id the owner of the profile
  // find the posts that have the user_id as the owner
  knex('posts')
    .where({user_id})
    .select('*')
    .then((personalPosts) => {
      console.log('here are the personal posts', personalPosts);
      // hand the personal posts to callback to send them to client
      cb(personalPosts);
    });
};

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
      if (entry.length === 0) {
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
          .then(() => console.error('Testing'));
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
      if (entry.length === 0) {
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
  knex('user_target_relation')
    .where({
      user_id: body.user_id,
      target_id: body.target_id,
    })
    .update({ isAccepted: true })
    .then(callback);
};

module.exports.handleFollowDecline = (body, callback) => {
  knex('user_target_relation')
    .where({
      user_id: body.user_id,
      target_id: body.target_id,
    })
    .delete()
    .then(callback);
};

module.exports.handleGetAllComments = (params, callback) => {
  knex('comments')
    .where({
      post_id: params.post_id,
    })
    .then(callback);
};

module.exports.handleGetUserName = (params, callback) => {
  knex('users')
    .where({
      id: params.user_id,
    })
    .then(callback);
};

module.exports.test = (body, callback) => {
  // WRONG
  callback(body);
};

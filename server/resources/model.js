const { password } = require('../../db/config.example.js');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    // host: 'localhost',
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b072f94880df8d',
    password: '66d6b4f1',
    database: 'heroku_267032ea6cb23cc',
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

module.exports.handleUpdateProfilePic = (body, callback) => {
  console.log('body before the update happens', body);
  knex('users')
    .where({ id: body.user_id })
    .update({
      picCloudinaryId: body.picCloudinaryId,
      displayImageUrl: body.displayImageUrl,
    })
    .then(callback);

};

module.exports.getPofilePicCloudinaryId = (user_id, callback) => {
  knex('users')
    .where({ id: user_id })
    .select('picCloudinaryId')
    .then((results) => {
      callback(results[0].picCloudinaryId);
    });
};

module.exports.handleUpdateProfileBio = (body, callback) => {
  knex('users')
    .where({ id: body.user_id })
    .update({
      bio: body.bio,
    })
    .then(callback);
};

module.exports.getExploreFeed = (cb) => {
  knex('posts')
    .select()
    .then(cb);
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

module.exports.handleRemoveLike = (body, callback) => {
  console.log(body);
  knex('likes')
    .where({
      user_id: body.user_id,
      post_id: body.post_id,
    })
    .delete()
    .then(callback);

  knex('posts').where({ id: body.post_id })
    .increment('likes_count', -1)
    .then(() => console.error('Testing'));
};

module.exports.handleGetLike = (params, callback) => {
  knex('likes')
    .select()
    .where({
      user_id: params.user_id,
      post_id: params.post_id,
    })
    .then(callback);
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
    .then((item) => {
      knex('users')
        .where({ id: body.user_id })
        .increment('following_count', 1)
        .then(thing => console.log('following_count updated', thing));

      knex('users')
        .where({ id: body.target_id })
        .increment('follower_count', 1)
        .then(thing => console.log('follower_count updated', thing));

      callback(item);
    });
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

module.exports.handleCheckFollow = (params, callback) => {
  knex('user_target_relation')
    .where({
      user_id: params.user_id,
      target_id: params.target_id,
    })
    .then(callback);
};

module.exports.fetchFollowRequests = (params, callback) => {
  knex('user_target_relation')
    .where({
      isAccepted: 0,
      target_id: params.target_id,
    })
    .then((response) => {
      const userIds = response.map((record) => {
        return (record.user_id);
      });
      knex('users').select().whereIn('id', userIds)
        .then(callback);
    });
};

module.exports.addUserToDb = (body, callback) => {
  knex('users').select()
    .where({
      username: body.username,
    })
    .then((response) => {
      if (response.length === 0) {
        knex('users')
          .insert({
            username: body.username,
            password: body.password,
            follower_count: 0,
            following_count: 0,
          })
          .then(id => knex('users').select().where('id', id))
          .then(callback);
      } else {
        callback([]);
      }
    });
};

module.exports.fetchUser = (body, callback) => {
  knex('users').select()
    .where({
      username: body.username,
    })
    .then(callback);
};

module.exports.handleGetAllComments = (params, callback) => {
  knex('comments')
    .where({
      post_id: params.post_id,
    })
    .then(callback);
};

module.exports.checkSession = (body, callback) => {
  if (body.user) {
    knex('users').select()
      .where({
        username: body.user,
      })
      .then((response) => {
        callback(response);
      });
  } else {
    callback('invalid user session');
  }
};

module.exports.handleGetUserName = (params, callback) => {
  knex('users')
    .where({
      id: params.user_id,
    })
    .then(callback);
};

module.exports.destroySession = (body, callback) => {
  if (body) {
    body.destroy();
    callback('destroyed');
  } else {
    callback('no body');
  }
};

module.exports.test = (body, callback) => {
  // WRONG
  callback(body);
};

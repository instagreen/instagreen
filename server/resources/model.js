const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
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

// Put all db queries here
module.exports.handleNewLike = (body, callback) => {
  // if a record in likes table DOES NOT contain user_id and post_id
  // THEN
  // add a new like record in the likes database
  // increment likes_count of the post in the posts table
  // ELSE DO NOTHING OR RETURN FALSE

};

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

module.exports.test = (body, callback) => {
  callback();
};

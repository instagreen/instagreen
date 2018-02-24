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

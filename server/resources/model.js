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
  knex('likes')
    .select()
    .where({
      user_id: body.user_id,
      post_id: body.post_id,
    })
    .then((entry) => {
      
    });
};

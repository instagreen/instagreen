const knex = require('knex')({ // create the connection
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'instagreen',
    charset: 'utf8',
  },
});

// create random usernames
const getRandomUsername = (names, adjectives) => `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${names[Math.floor(Math.random() * names.length)]}`;
const names = ['hero', 'potato', 'ninja', 'boy', 'thor', 'hulk'];
const adjectives = ['super', 'greedy', 'fantastic', 'lazy', 'hAngry'];

const insertDummyDataForFeed = () => {
  for (let index = 0; index < 3; index += 1) {
    const randomUserName = getRandomUsername(names, adjectives);
    knex('users').insert({ // insert data in users table
      username: randomUserName, password: '', follower_count: 0, following_count: 0,
    })
      .then(() => {
        knex('posts').insert({ user_id: index + 1, likes_count: 0 }).then(() => { // insert data in posts table
        });
      })
      .then(() => { // insert data in user_target_relation table
        knex('user_target_relation').insert({ user_id: 1, target_id: index + 1, isAccepted: true }).then(() => {
        }).then(() => {
          console.log('Data seeded for feed!');
        });
      });
  }
};

insertDummyDataForFeed();

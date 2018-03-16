// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

// module.exports.connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'instagreen',
//   // password,
// });

module.exports.connection = mysql.createConnection({
  host: 'instagreen.cg33syvifjip.us-west-1.rds.amazonaws.com',
  user: 'root',
  database: 'instagreen',
  password: '123456789',
});

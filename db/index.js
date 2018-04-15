// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  // host: 'localhost',
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b32fc05893b600',
  password: 'a5c19a01',
  database: 'heroku_9de0048cdaa7a40',
  // password,
});

// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'instagreen',
  // password,
});

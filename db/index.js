const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  user: 'root',
  database: 'instagreen',
  password,
});

// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  // host: 'localhost',
  host: 'mysql://b072f94880df8d:66d6b4f1@us-cdbr-iron-east-05.cleardb.net/heroku_267032ea6cb23cc?reconnect=true',
  user: 'root',
  database: 'instagreen',
  // password,
});

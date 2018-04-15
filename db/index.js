// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  // host: 'localhost',
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b072f94880df8d',
  password: '66d6b4f1',
  database: 'heroku_267032ea6cb23cc',
  // password,
});

// UNCOMMENT IF NEEDED
// const password = require('./config.example.js');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  // host: 'localhost',
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b10eb618184c08',
  password: '3c9d47f2',
  database: 'heroku_6060cc6c8db2b28',
  // password,
});

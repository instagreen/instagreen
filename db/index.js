const password = require('./config');
const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  user: 'root',
  password: password,
  database: 'instagreen'
});

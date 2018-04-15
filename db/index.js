
const {
  password, user, host, database,
} = require('./config.js');

const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
  // host: 'localhost',
  host,
  user,
  password,
  database,
  // password,
});

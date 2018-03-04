const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const { router } = require('./resources/instagreenRouter');


const port = 3000;
const app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'packyourbags',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 300000, // cookie set to 60 seconds for testing
  },
}));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use(favicon(path.join(__dirname, '../client', 'dist', 'favicon.ico')));

app.use('/instagreen', router);

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

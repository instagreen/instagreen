const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const { router } = require('./resources/instagreenRouter');

const port = 80;
const app = express();

app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'packyourbags',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 300000, 
  },
}));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use(favicon(path.join(__dirname, '../client', 'dist', 'favicon.ico')));

app.use('/instagreen', router);
// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

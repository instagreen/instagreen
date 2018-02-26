const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { router } = require('./resources/instagreenRouter');
const logger = require('morgan');

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
    expires: 10000,
  },
}));

// app.get('/', sessionChecker, (req, res) => {
//   res.send('go back to login');
// })


app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/instagreen', router);

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

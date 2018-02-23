const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { router } = require('./resources/instagreenRouter');
const logger = require('morgan');

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/instagreen', router);
app.use(logger('tiny'));

app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

const axios = require('axios');


const SERVER = 'http://localhost:3000/instagreen';
// /instagreen/feed/1
module.exports.getFeed = (user_id, cb) => {
  axios.get(`${SERVER}/feed/${user_id}`)
    .then((feed) => {
      console.log('Here is the feed I got', feed);
      cb(feed);
    })
    .catch((error) => {
      console.log(`Error while trying to get the feed -> apiCallers.js -> ${error.lineNumber}`, error);
    });
};

module.exports.getFeed(1, (feed) => {
  console.log('feed in callback', feed);
});

import axios from 'axios';

const SERVER = 'http://localhost:3000/instagreen';

const APICaller = {
  getFeed: (user_id, cb) => {
    axios.get(`${SERVER}/feed/${user_id}`)
      .then((feed) => {
        console.log('Here is the feed I got', feed);
        cb(feed);
      })
      .catch((error) => {
        console.log(`Error while trying to get the feed -> apiCallers.js -> ${error.lineNumber}`, error);
      });
  },

};

export default APICaller;

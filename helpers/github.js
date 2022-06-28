const axios = require('axios').default;
const config = require('../config.js');
// const save = require('/home/marzmu/hackreactor/rfp2205-fullstack-review/database/index.js').save;

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    // method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }

  };

   axios(options)
   .then((results) => {callback(null, results.data) } )
   .catch((err) => { callback(err, null); })





}

module.exports.getReposByUsername = getReposByUsername;
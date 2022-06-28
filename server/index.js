const express = require('express');
let app = express();
const {getReposByUsername} = require('../helpers/github.js');
const {save, retrieve} = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos',  function (req, res) {
  //CALLBACK - CREATES REQUEST TO GH
  // SEARCH => GH => DB
  var postCallback = (reqUser, callback) => {

    getReposByUsername(reqUser, (err, repos) => {
      if (err) {
        callback(err, null);
      } else {
        repos = repos.map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo['html_url'],
          avatar: repo.owner['avatar_url'],
          owner: repo.owner.login
        }));
        save(repos, callback);
      }
    });

  }

  //PROCESSES REQ FROM SEARCH COMP
  var incoming = '';
  req.on('data', (chunk) => { incoming += chunk });
  req.on('end', () => {
    postCallback(incoming.slice(5), (err, result) => {
      if (err) {
        res.writeHead(404);
        res.end('ERROR, no repos recieved from DB');
      } else {
        //send result of call to DB back to search
        res.writeHead(200);
        res.end(JSON.stringify(result));
      }
    });
  });

  // getReposByUsername(username, callback)
  //on sucess, callback sends data to the DB (save function)
  // res.end('hello');



});

app.get('/repos', function (req, res) {

  retrieve((err, repos) => {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end('ERROR, no repos recieved from DB');
    } else {
      res.writeHead(200);
      res.end(JSON.stringify(repos));
    }
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


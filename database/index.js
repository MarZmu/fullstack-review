const mongoose = require('mongoose');
console.log('connecting');
mongoose.connect('mongodb://localhost:27017/fetcher', {
   useNewUrlParser: true,
   useUnifiedTopology: true
  }
).then()
.catch((error) => {
  console.log(error, 'attemtping to reconnect');
  mongoose.connect('mongodb://localhost:21017/fetcher',  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   });
  });

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  name: String,
  description: String,
  url: String,
  owner: String,
  avatar_url: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let retrieve = (callback) => {
  console.log('retreiving from DB');
  Repo.find({}, (err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      console.log(docs);
      callback(null, docs);
    }
  })
}

let save = (repoList, callback) => {

  console.log("made it to the model\n", repoList);
   //should be the call back executed when a successful POST occurs
   //recieves data from the AXIOS query to GITHUB
   //stores the repos in the database
   Repo.find({}, (err, docs) => {
    if (err) {
      throw err;
    } else {
      var names = docs.map((doc) => (doc.name));
      var noDups = repoList.filter((repo) => (names.includes(repo.name) === false));

      Repo.insertMany(noDups, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, repoList);
        }
       });


    }
   })

  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;
module.exports.retrieve = retrieve;

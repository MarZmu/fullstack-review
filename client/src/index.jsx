import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// const getReposByUsername = require('/home/marzmu/hackreactor/rfp2205-fullstack-review/helpers/github.js').getReposByUsername;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

//Intializes state with first 25 repos in the database
  componentDidMount() {
    //Callback passed to GET request, set state with repos
    var mountSuccessCB = (data) => {
      if (data.length > 25) {
        var rand = Math.floor(Math.random() * 10);
        data = data.filter((repo, ind) => (ind % rand === 0));
        data = data.slice(0, 25);
      }
      this.setState({repos: data});
    }
    //local GET request to /repos path, expecting JSON response
    $.get('/repos',
    mountSuccessCB,
    'json'
    )
  };

  //Generates API Github Request (from search comp)
  search (term) {
    //callback- when response from server occurs, sets state
    var successcb = (result) => {
      //adds results to the top of a state copy, then sets state with 25 repos
      var copy = this.state.repos.slice();
      copy.sort((a, b) => (b.forks - a.forks));
      // var rand = Math.floor(Math.random() * 10);
      // copy = copy.filter((repo, ind) => (ind % rand === 0));
      result.forEach((res) => {
        copy.unshift(res);
      })
      this.setState({repos: copy.slice(0, 25)});
    }
    //(REQUEST TO 1128 / APP.POST  / SERVER/INDEX.JS)
   $.post('/repos',
     {name: term},
     successcb,
     "json"
   );

  }


  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
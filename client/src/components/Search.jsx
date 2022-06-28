import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    console.log(e.target.value);
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      <label>Enter a github username:</label> <input value={this.state.terms} onChange={(e) => (this.onChange(e))}/>
      <button onClick={this.search}> Add Repos </button>
    </div>)
  }
}

export default Search;
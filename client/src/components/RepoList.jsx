import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, ind) =>
      (<li key={ind} >{`Name: `}<a href={repo.url}>{repo.name}</a>{` Description: ${repo.description} url: ${repo.url} owner: ${repo.owner}`}</li>)
    )}
  </div>
)

export default RepoList;
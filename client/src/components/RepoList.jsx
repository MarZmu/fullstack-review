import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, ind) =>
      (<li key={ind} ><a href={repo.url}>{repo.name}</a>{`     \n Description: ${repo.description} Owner: ${repo.owner} Forks: ${repo.forks}   `}</li>)
    )}
  </div>
)

export default RepoList;
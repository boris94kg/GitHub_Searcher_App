import React from 'react';
import PropType from 'prop-types';

const RepoItem = ({repo}) => { 
  return (
    <div className="card">
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  )
}

RepoItem.propType = {
  repo: PropType.object.isRequired
}

export default RepoItem;
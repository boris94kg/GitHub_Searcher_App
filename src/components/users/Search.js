import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import githubContext from '../../context/github/githubContext';

const Search = ({ setAlert }) => {
  const GithubContext = useContext(githubContext);

  const { searchUsers, clearUsers, users} = GithubContext;

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  }

  const onChange = (e) => {
    setText(e.target.value);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange} />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {users.length > 0 &&
        <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}
    </div>
  )
}

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default Search;
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import SingleUser from './components/users/SingleUser';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import GitHubState from './context/github/GitHubState';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlerting] = useState(null);



  //Get a single user
  const getSingleUser = async (username) => {
    setLoading(true);

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  //Get users repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios
      .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }

  //Clear Users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  //Set Alert
  const setAlert = (msg, type) => {
    setAlerting({ msg, type });

    setTimeout(() => {
      setAlerting(null);
    }, 5000)
  }

  return (
    <GitHubState>
      <BrowserRouter>
        <>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <>
                  <Search
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <SingleUser {...props} getSingleUser={getSingleUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
              )} />
            </Switch>

          </div>
        </>
      </BrowserRouter>
    </GitHubState>

  );
}

export default App;

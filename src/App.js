import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import SingleUser from './components/users/SingleUser';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GitHubState from './context/github/GitHubState';
import './App.css';

const App = () => {
  const [alert, setAlerting] = useState(null);





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
                    setAlert={setAlert}
                  />
                  <Users />
                </>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' component={SingleUser} />
            </Switch>

          </div>
        </>
      </BrowserRouter>
    </GitHubState>

  );
}

export default App;

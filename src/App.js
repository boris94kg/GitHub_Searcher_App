import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios
  //     .get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


  //   this.setState({
  //     users: res.data,
  //     loading: false
  //   })
  // }

  //Search Github Users
  searchUsers = async (text) => {
    this.state.loading = true;

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    this.setState({
      users: res.data.items,
      loading: false
    })
  }
  //Clear Users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }
  //Set Alert
  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type }
    })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 5000)
  }

  render() {
    const { users, loading, alert } = this.state;
    const { searchUsers, clearUsers, setAlert } = this;

    return (
      <BrowserRouter>
        <>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlert}
                  />
                  <Users loading={loading} users={users} />
                </>
              )} />
              <Route exact path='/about' component={About} />
            </Switch>

          </div>
        </>
      </BrowserRouter>

    );
  }
}

export default App;

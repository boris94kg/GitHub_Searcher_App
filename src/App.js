import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import SingleUser from './components/users/SingleUser';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    users: [],
    user: {},
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
    });
  }

  //Get a single user
  getSingleUser = async (username) => {
    this.setState({loading: true});

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      this.setState({
        user: res.data,
        loading: false
      });
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
    const { users, loading, alert, user } = this.state;
    const { searchUsers, clearUsers, setAlert, getSingleUser } = this;

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
              <Route exact path='/user/:login' render={props =>(
                <SingleUser {...props } getSingleUser={getSingleUser} user={user}  loading={loading}/>
              )} />
            </Switch>

          </div>
        </>
      </BrowserRouter>

    );
  }
}

export default App;

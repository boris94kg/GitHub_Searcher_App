import React, { useReducer } from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../../components/types';

const GitHubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }


  const [state, dispatch] = useReducer(githubReducer, initialState);


  //Search Github Users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios
      .get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  //Get a single user
  const getSingleUser = async (username) => {
    setLoading();

    const res = await axios
      .get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

    //Get users repos
    const getUserRepos = async (username) => {
      setLoading();
  
      const res = await axios
        .get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
        dispatch({ 
          type: GET_REPOS,
          payload: res.data
        })
    }


  //Clear Users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS })



  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })



  return <githubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getSingleUser,
      getUserRepos
      
    }}
  >
    {props.children}
  </githubContext.Provider>

}

export default GitHubState;

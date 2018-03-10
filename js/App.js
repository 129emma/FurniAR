import React, { Component } from 'react';
// Using Viro's AR scene wrapper 
import {
  ViroARSceneNavigator
} from 'react-viro';
// Connect react and redux
import { Provider } from 'react-redux';
// Using redux to manage states 
import { createStore, applyMiddleware } from 'redux';
// Firebase as backend
import firebase from 'firebase';
// ReduxThunk for 
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

export default class ViroSample extends Component {
  constructor() {
    super();
    
    var config = {
      apiKey: "AIzaSyBjXw5MDI7UGl-L6HSf6dtZ3CdL2Kp0xYE",
      authDomain: "manager-6d810.firebaseapp.com",
      databaseURL: "https://manager-6d810.firebaseio.com",
      projectId: "manager-6d810",
      storageBucket: "manager-6d810.appspot.com",
      messagingSenderId: "760200674209"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

module.exports = ViroSample

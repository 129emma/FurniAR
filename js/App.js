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
    
    const config = {
      apiKey: 'AIzaSyBR4FTGiOcTZ5OBNi6thE0KhCDR3PaOtQM',
      authDomain: 'manager-2328b.firebaseapp.com',
      databaseURL: 'https://manager-2328b.firebaseio.com',
      storageBucket: 'manager-2328b.appspot.com',
      messagingSenderId: '193075244299'
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

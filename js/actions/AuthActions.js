import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_TYPE_CHANGED
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const userTypeChanged = text => {
  return {
    type: USER_TYPE_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
      Actions.main();
  };
};


export const registerUser = ({ email, password, selectedType, username }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
    
    if (selectedType === 'buyer') {
      firebase.database().ref(`/users/${currentUser.uid}/buyers`)
      .push({ username, email, password })
      Actions.main();

    } else {
      firebase.database().ref(`/users/${currentUser.uid}/sellers`)
      .push({ username, email, password })
      Actions.contact();
    }
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

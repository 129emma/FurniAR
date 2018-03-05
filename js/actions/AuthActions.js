import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
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

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user, ifTutor) => loginTuteeSuccess(dispatch, user, ifTutor))
      .catch(() => loginUserFail(dispatch));
  };
};

// export const loginOwnBackend = ({ email, password }) => {
//   return (dispatch) => {
//     dispatch({ type: LOGIN_USER });
//
//     fetch('http://192.168.0.7/login/logging', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       })
//     });
//   };
// };

// export const registerTutee = ({ email, password }) => {
//   return (dispatch) => {
//     dispatch({ type: 'register_tutee'});

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then((user, false) =>  loginUserSuccess(dispatch, user, false))
//       .catch(() => loginUserFail(dispatch));

//     Actions.tutee();
//   };
// };

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
}

// const loginTuteeSuccess = (dispatch, user, false) => {
//   dispatch({
//     type: 'login_tutee_success',
//     payload: { user, false }
//   });

//   Actions.tutee();
// };

const loginTutorSuccess = (dispatch) => {

}

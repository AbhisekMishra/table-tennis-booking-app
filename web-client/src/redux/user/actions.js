import types from './types';
import { login, createUser } from '../../graphql/user/user.apollo';
import { handleError } from '../error/actions';
/*
 * action creators
 */

const setLoginData = payload => ({
  type: types.SET_LOGIN_DATA,
  payload,
});

const loginUser = ({username, password}) => {
  return (dispatch) => {
      return login(username, password).then(res => {
          if(res.data.loginData) {
            dispatch(setLoginData(res.data.loginData));
            return true;
          } else {
            dispatch(handleError(res.errors[0].message));
            return false;
          }
      }).catch(err => {
        if(Array.isArray(err)) {
          dispatch(handleError(err[0].message));
        } else {
          dispatch(handleError(err.message));
        }
      })
    }
}

const registerUser = (data) => {
  return (dispatch) => {
      return createUser(data).then(res => {
          if(res.data.loginData) {
            dispatch(setLoginData(res.data.loginData));
            return true;
          } else {
            dispatch(handleError(res.errors[0].message));
            return false;
          }
      }).catch(err => {
        if(Array.isArray(err)) {
          dispatch(handleError(err[0].message));
        } else {
          dispatch(handleError(err.message));
        }
      })
    }
}

export { loginUser, registerUser };
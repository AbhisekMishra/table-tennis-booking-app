import { combineReducers } from 'redux'
import userData from './user/reducer';
import booking from './booking/reducer';
import error from './error/reducer';

export default combineReducers({
    userData,
    booking,
    error,
  })
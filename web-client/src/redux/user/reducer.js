import types from './types'

const initialState = {
    token: "",
    userData: {},
};

function userData(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN_DATA:
        return {...state, ...action.payload};
    case types.CLEAR_LOGIN_DATA:
        return initialState;
    default:
      return state
  }
}

export default userData;
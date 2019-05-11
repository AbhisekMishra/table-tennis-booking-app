import types from './types'

const initialState = {
    token: "",
    userData: {},
};

function booking(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOGIN_DATA:
        return {...state, ...action.payload};
    default:
      return state
  }
}

export default booking;
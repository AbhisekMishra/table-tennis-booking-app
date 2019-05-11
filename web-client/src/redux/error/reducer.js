import types from './types'

const initialState = {
    showError: false,
    errorMessage: '',
};

function error(state = initialState, action) {
  switch (action.type) {
    case types.SET_ERROR:
        return {...state, showError: true, errorMessage: action.payload};
    case types.CLEAR_ERROR:
        return initialState;
    default:
      return state
  }
}

export default error;
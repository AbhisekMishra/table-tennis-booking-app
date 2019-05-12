import types from './types';

/*
 * action creators
 */

const setError = payload => ({
  type: types.SET_ERROR,
  payload,
});

const clearError = () => ({
    type: types.CLEAR_ERROR,
  });

const handleError = (message) => {
  return (dispatch) => {
    if(message === 'AUTH_ERROR') {
      localStorage.removeItem('authToken');
      // location.reload();
    }
      dispatch(setError(message));
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
}

export { handleError };
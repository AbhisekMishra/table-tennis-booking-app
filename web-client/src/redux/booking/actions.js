import types from './types';
import { login } from '../../graphql/user';

/*
 * action creators
 */

const loginUser = ({username, password}) => {
  return (dispatch) => {
      return login(username, password).then(results => {
          console.log(results);
        return results.json();
      })
    }
}

export { loginUser };
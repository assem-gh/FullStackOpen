import * as loginService from '../../services/login';
import { setToken } from '../../services/blogs';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const initUser = (user) => ({ type: 'LOGIN', data: user });
export const loginUser = (userName, password) => async (dispatch) => {
  const user = await loginService.login({ userName, password });
  window.localStorage.setItem('loggedUser', JSON.stringify(user));
  setToken(user.token);
  dispatch({ type: 'LOGIN', data: user });
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedUser');
  return { type: 'LOGOUT' };
};

export default loginReducer;

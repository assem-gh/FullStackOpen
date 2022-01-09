import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { loginUser } from '../store/reducers/loginReducer';
import { setNotification } from '../store/reducers/notificationReducer';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(userName, password));
      setUserName('');
      setPassword('');
      dispatch(
        setNotification({ type: 'success', msg: `${userName} logged in` })
      );
    } catch (err) {
      dispatch(
        setNotification({ type: 'error', msg: 'Wrong Username or Password' })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={userName}
          name="UserName"
          id="userName"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginBtn" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;

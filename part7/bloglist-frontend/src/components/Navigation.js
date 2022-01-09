import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { logoutUser } from '../store/reducers/loginReducer';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background-color: #b1dcfa;
  color: #000;
  height: 60px;
`;

export const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  height: 100%;
  display: grid;
  align-items: center;
  padding: 0 20px;
  &:hover {
    background-color: #fff;
  }
`;

const Navigation = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Nav>
      <StyledLink to="/blogs">Blogs</StyledLink>
      <StyledLink to="/users">Users</StyledLink>
      <div>
        {user && (
          <p>
            {user?.name} logged in{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>
        )}
      </div>
    </Nav>
  );
};

export default Navigation;

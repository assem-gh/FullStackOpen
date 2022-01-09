/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Blog from './components/blog/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/blog/BlogForm';
import Togglable from './components/Togglable';
import Users from './components/users/Users';
import User from './components/users/User';
import Navigation from './components/Navigation';

import { initBlogs } from './store/reducers/blogReducer';
import { getAllUsers } from './store/reducers/usersReducer';

import * as blogService from './services/blogs';
import { initUser } from './store/reducers/loginReducer';

import { List } from './components/Comments';
import { StyledLink } from './components/Navigation';

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const blogFormRef = useRef();
  const sortedBlogs = state.blogs.sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(initUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <Router>
      <Navigation />
      <h2>Blog App</h2>
      {!state.user && <LoginForm />}
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <div>user</div>
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>

        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          {state.user && (
            <div>
              <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              {sortedBlogs.map((blog) => (
                <List key={blog.id}>
                  <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
                </List>
              ))}
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

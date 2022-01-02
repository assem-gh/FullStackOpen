import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const [notification, setNotification] = useState(null);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        userName,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName('');
      setPassword('');
      setNotification({ type: 'success', msg: `${user.userName} logged in` });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setNotification({ type: 'error', msg: 'Wrong Username or PAssword' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value });
  };
  const addBlog = async (e) => {
    const { title, author, url } = newBlog;
    try {
      e.preventDefault();
      if (!(title && author && url)) throw Error('Please Fill the fields To add new Blog');

      const createdBlog = await blogService.create(newBlog);
      setBlogs([...blogs, createdBlog]);
      setNewBlog({ title: '', author: '', url: '' });
      setNotification({
        type: 'success',
        msg: `${createdBlog.title} by ${createdBlog.author} added`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.log(err);
      setNotification({ type: 'error', msg: err.message });
      setTimeout(() => {
        setNotification(null);
      }, 7000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={userName}
            name="UserName"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">url: </label>
          <input
            id="url"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Create New Blog</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

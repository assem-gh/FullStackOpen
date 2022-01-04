import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import * as blogService from './services/blogs';
import * as loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(initialBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userName, password) => {
    try {
      const user = await loginService.login({
        userName,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ type: 'success', msg: `${user.userName} logged in` });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      setNotification({ type: 'error', msg: 'Wrong Username or Password' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    const { title, author, url } = newBlog;
    try {
      if (!(title && author && url))
        throw Error('Please Fill the fields To add new Blog');

      const createdBlog = await blogService.create(newBlog);
      console.log(createdBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, createdBlog]);
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
      }, 5000);
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      const returnedBlog = await blogService.update(
        blogToUpdate.id,
        blogToUpdate
      );
      const newBlogs = blogs.map((blog) =>
        blog.id === returnedBlog.id ? returnedBlog : blog
      );
      setBlogs(() => newBlogs);
      setNotification({
        type: 'success',
        msg: `${returnedBlog.title} has updated`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      setNotification({
        type: 'error',
        msg: `${err.message}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      const newBlogs = blogs.filter((blog) => blogToDelete.id !== blog.id);
      await blogService.remove(blogToDelete.id);
      setBlogs(() => newBlogs);
      setNotification({
        type: 'success',
        msg: `${blogToDelete.title} successfuly deleted`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      console.dir(err);
      setNotification({
        type: 'error',
        msg: `${err.message}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
          <h2>Create New Blog</h2>
          <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              userName={user.userName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

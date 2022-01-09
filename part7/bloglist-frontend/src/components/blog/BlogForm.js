import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBlog } from '../../store/reducers/blogReducer';
import { setNotification } from '../../store/reducers/notificationReducer';

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(newBlog.title && newBlog.author && newBlog.url))
      throw Error('Please Fill the fields To add new Blog');
    try {
      dispatch(addBlog(newBlog));
      dispatch(
        setNotification({
          type: 'success',
          msg: `${newBlog.title} by ${newBlog.author} added`,
        })
      );
      setNewBlog({ title: '', author: '', url: '' });
    } catch (err) {
      dispatch(setNotification({ type: 'error', msg: `${err.message}` }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
export default BlogForm;

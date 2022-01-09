import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value });
  };

  const addBlog = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

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
export default BlogForm;

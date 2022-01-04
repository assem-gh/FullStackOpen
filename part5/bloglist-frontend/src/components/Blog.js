import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog, userName }) => {
  const [visibility, setVisibility] = useState(false);

  const blogStyle = {
    borderRadius: '5px',
    paddingTop: '10px',
    paddingLeft: '2px',
    marginBottom: '5px',
    border: '1px solid black',
  };

  const blogDetails = () => {
    return (
      <>
        <p>{blog.url}</p>
        <div>
          <span> likes: {blog.likes}</span>{' '}
          <button onClick={handleLikes}>like</button>
        </div>
        <p>{blog.user.userName}</p>
      </>
    );
  };
  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateBlog(updatedBlog);
  };
  const handleRemove = () => {
    const result = window.confirm(`remove Blog ${blog.title}? `);
    if (result) {
      deleteBlog(blog);
    }
  };
  return (
    <div style={blogStyle} className="blog-container">
      <div>
        <strong>{blog.title} </strong>
        <span>by {blog.author}</span>
      </div>
      <button onClick={() => setVisibility(!visibility)}>
        {visibility ? 'hide' : 'view'}
      </button>
      {visibility && blogDetails()}
      {visibility && userName === blog.user.userName && (
        <button
          onClick={handleRemove}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          remove
        </button>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  userName: PropTypes.string.isRequired,
  // updateBlog: PropTypes.func.isRequired,
  // deleteBlog: PropTypes.func.isRequired,
};

export default Blog;

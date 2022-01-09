import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Comments from '../Comments';
import BlogDetails from './BlogDetails';

import { StyledP } from './BlogDetails';

export const Container = styled.div`
  padding: 30px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border: 2px solid #000;
  margin: 5px auto;
  > * {
  }
`;

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const user = useSelector((state) => state.user);

  if (!blog) return null;
  return (
    <>
      <Container className="blog-container">
        <h2>
          {blog.title} {blog.author}
        </h2>
        <BlogDetails blog={blog} />
        <StyledP>add by {blog.user.name}</StyledP>
      </Container>
      <Container>
        <h3>Comments</h3>
        <Comments comments={blog.comments} blogID={blog.id} />
      </Container>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default Blog;

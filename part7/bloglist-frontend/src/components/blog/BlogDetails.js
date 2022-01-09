import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog } from '../../store/reducers/blogReducer';
import { setNotification } from '../../store/reducers/notificationReducer';
import styled from 'styled-components';

const URL = styled.a`
  padding: 10px;
  font-size: 30px;
  color: blue;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  padding: 10px;
  outline: none;
  border: none;
  background-color: #00ab4c;
  color: #fff;
  font-size: 18px;
  width: 120px;
  margin-right: 50px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #007735;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const StyledP = styled.p`
  padding: 10px;
  font-size: 18px;
`;
const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    try {
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotification({
          type: 'success',
          msg: `${updatedBlog.title} has updated`,
        })
      );
    } catch (err) {
      dispatch(setNotification({ type: 'error', msg: `${err.message}` }));
    }
  };
  return (
    <>
      <URL target="blank" href={blog.url}>
        {blog.url}
      </URL>
      <StyledDiv>
        <span className="likesCount"> likes: {blog.likes}</span>{' '}
        <Btn onClick={handleLikes}>like</Btn>
      </StyledDiv>
      <StyledP>{blog.user.userName}</StyledP>
    </>
  );
};
export default BlogDetails;

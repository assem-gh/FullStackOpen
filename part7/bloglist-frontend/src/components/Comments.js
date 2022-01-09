import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useField } from '../hooks';
import { addComment } from '../store/reducers/blogReducer';

export const List = styled.ul`
  list-style: none;
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding: 10px 0;
`;
export const ListItem = styled.li`
  padding: 25px 20px;
  font-size: 18px;
  border: 1px solid #878990;
  border-radius: 15px;
`;

const Comments = ({ comments, blogID }) => {
  const { reset, ...content } = useField('text');
  const dispatch = useDispatch();
  console.log(content);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(blogID, content.value));
    reset();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input {...content} />
        <button>add comment</button>
      </form>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment.id}>{comment.content}</ListItem>
        ))}
      </List>
    </>
  );
};

export default Comments;

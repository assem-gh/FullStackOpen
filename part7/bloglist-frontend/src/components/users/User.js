import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );
  if (!user) return null;
  return (
    <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  );
};
export default User;

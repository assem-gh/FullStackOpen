import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          <span> {user.blogs.length}</span>
        </div>
      ))}
    </div>
  );
};
export default Users;

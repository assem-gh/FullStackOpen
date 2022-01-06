import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    if (newAnecdote) {
      e.target.anecdote.value = '';
      dispatch(addAnecdote(newAnecdote));
      dispatch(setNotification('create', newAnecdote));
      setTimeout(() => dispatch(removeNotification()), 5000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;

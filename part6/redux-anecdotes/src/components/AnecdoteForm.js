import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';
import * as anecdoteService from '../services/anecdoteService';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    if (content) {
      e.target.anecdote.value = '';
      const anecdote = await anecdoteService.add(content);
      dispatch(addAnecdote(anecdote));
      dispatch(setNotification('create', content));
      setTimeout(() => dispatch(removeNotification()), 5000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdotesForm;

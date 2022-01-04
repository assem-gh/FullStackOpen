import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const newAnecdote = e.target.anecdote.value;
    if (newAnecdote) {
      e.target.anecdote.value = '';
      console.log(newAnecdote);
      dispatch(addAnecdote(newAnecdote));
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

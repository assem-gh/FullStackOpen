import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes);
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const anecdotesToDisplay = filter
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedAnecdotes;
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification('vote', anecdote.content, 5));
  };

  const list = () =>
    anecdotesToDisplay.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));

  return <>{list()}</>;
};

export default AnecdoteList;

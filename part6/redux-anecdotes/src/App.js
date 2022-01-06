import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as anecdoteService from './services/anecdoteService';
import { initAnecdotes } from './reducers/anecdoteReducer';

import AnecdotesForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(initAnecdotes(anecdotes)));
  }, [dispatch]);

  const notification = useSelector((state) => state.notification);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {notification && <Notification />}
      <AnecdoteList />
      <AnecdotesForm />
    </div>
  );
};

export default App;

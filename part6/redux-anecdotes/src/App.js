import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { initAnecdotes } from './reducers/anecdoteReducer';

import AnecdotesForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdotes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

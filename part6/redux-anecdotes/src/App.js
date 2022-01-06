import React from 'react';
import { useSelector } from 'react-redux';

import AnecdotesForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
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
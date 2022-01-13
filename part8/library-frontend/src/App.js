
import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('libraryApp-token'));
  }, [token]);

  const logout = () => {
    setToken(null);
    setPage('authors');
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <button onClick={logout}> Logout</button>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recomended
            </button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'}  />

      <LoginForm
        setError={setError}
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  );
};

export default App
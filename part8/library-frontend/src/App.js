
import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { useApolloClient, useSubscription } from '@apollo/client';
import { BOOK_ADDED, GET_ALL_AUTHORS, GET_ALL_BOOKS } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const client = useApolloClient();

  if (error) {
    window.alert(error);
    setError('');
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      const authorName = addedBook.author.name;
      window.alert(`Book ${addedBook.title} added`);

      const authorsInStore = client.readQuery({ query: GET_ALL_AUTHORS });
      const booksInStore = client.readQuery({ query: GET_ALL_BOOKS });

      client.writeQuery({
        query: GET_ALL_BOOKS,
        data: {
          ...booksInStore,
          allBooks: [...booksInStore.allBooks, addedBook],
        },
      });
      client.writeQuery({
        query: GET_ALL_AUTHORS,
        data: {
          ...authorsInStore,
          allAuthors: authorsInStore.allAuthors.map((a) =>
            a.name === authorName ? { ...a, bookCount: a.bookCount + 1 } : a
          ),
        },
      });
    },
  });

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('libraryApp-token'));
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setPage('authors');
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
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

      <NewBook setPage={setPage} setError={setError} show={page === 'add'} />

      <Recommendations show={page === 'recommendations'}  token={token} />

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
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_ALL_BOOKS, GET_USER } from '../queries';

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});

  const userResult = useQuery(GET_USER);

  const [getBooks, booksResult] = useLazyQuery(GET_ALL_BOOKS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (userResult.data) setUser(userResult.data.me);
  }, [userResult]);

  useEffect(() => {
    getBooks({ variables: { genre: user.favoriteGenre } });
  }, [user, getBooks]);

  useEffect(() => {
    if (booksResult.data) setBooks(booksResult?.data.allBooks);
  }, [booksResult]);

  if (!props.show) return null;
  return (
    <>
      <h1>Recommendations</h1>
      <p>
        Books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendations;

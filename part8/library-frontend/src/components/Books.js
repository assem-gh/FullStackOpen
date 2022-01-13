import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import BookByGenre from './BooksByGenre';
import { GET_ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState('');

  const result = useQuery(GET_ALL_BOOKS);
  const booksToShow = genre
    ? books.filter((book) => book.genres.includes(genre))
    : books;

  useEffect(() => {
    if (result.data) setBooks(result.data.allBooks);
  }, [result.data, genre]);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre {genre}</p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookByGenre books={books} setGenre={setGenre} />
    </div>
  );
};

export default Books;

import React from 'react';

const BookByGenre = ({ books, setGenre }) => {
  let genres = new Set();
  books.forEach((book) => {
    genres = new Set([...genres, ...book.genres]);
  });

  return (
    <div>
      <button onClick={() => setGenre('')}>All</button>
      {[...genres].map((genre, i) => (
        <button key={i} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};
export default BookByGenre;

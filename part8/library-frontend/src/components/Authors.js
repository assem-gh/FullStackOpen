import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useField } from '../hooks';

import { GET_ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);

  const { reset: resetName, ...authorName } = useField();
  const { reset: resetBorn, ...born } = useField('number');

  const result = useQuery(GET_ALL_AUTHORS);
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data) setAuthors(result.data.allAuthors);
  }, [result.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(authorName.value);
    editAuthor({
      variables: { name: authorName.value, setBornTo: Number(born.value) },
    });
    resetName();
    resetBorn();
  };

  if (!props.show) {
    return null;
  }
  if (result.loadung) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <select {...authorName}>
            <option value="" disabled hidden>
              Choose name
            </option>
            {authors.map((author, i) => (
              <option key={i} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born: <input {...born} />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default Authors;

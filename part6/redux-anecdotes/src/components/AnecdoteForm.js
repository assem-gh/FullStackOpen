import React from 'react';
import { connect } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdotesForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    if (content) {
      e.target.anecdote.value = '';
      props.addAnecdote(content);
      props.setNotification('create', content, 5);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  setNotification,
  addAnecdote,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdotesForm);
export default ConnectedAnecdoteForm;

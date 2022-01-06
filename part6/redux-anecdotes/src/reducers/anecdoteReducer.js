import * as anecdoteService from '../services/anecdoteService';

const reducer = (state = [], { type, data }) => {
  switch (type) {
    case 'INIT':
      return data;
    case 'ADD_VOTE':
      const id = data.id;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    case 'ADD_ANECDOTE':
      return [...state, data];
    default:
      return state;
  }
};

export const initAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({
    type: 'INIT',
    data: anecdotes,
  });
};

export const voteAnecdote = (anecdote) => async (dispatch) => {
  await anecdoteService.vote(anecdote);
  dispatch({
    type: 'ADD_VOTE',
    data: { id: anecdote.id },
  });
};

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.add(content);
  dispatch({
    type: 'ADD_ANECDOTE',
    data: newAnecdote,
  });
};

export default reducer;

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

export const initAnecdotes = (anecdotes) => ({
  type: 'INIT',
  data: anecdotes,
});

export const voteAnecdote = (id) => ({
  type: 'ADD_VOTE',
  data: { id },
});

export const addAnecdote = (newAnecdote) => ({
  type: 'ADD_ANECDOTE',
  data: newAnecdote,
});

export default reducer;

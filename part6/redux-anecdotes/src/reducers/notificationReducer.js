const reducer = (state = null, { type, data }) => {
  switch (type) {
    case 'SET':
      return data;
    case 'REMOVE':
      return null;
    default:
      return state;
  }
};

export const setNotification = (userAction, anecdote) => ({
  type: 'SET',
  data:
    userAction === 'vote' ? `you voted ${anecdote}` : `you created ${anecdote}`,
});

export const setErrorNotification = (error) => ({
  type: 'SET',
  data: error,
});

export const removeNotification = () => ({
  type: 'REMOVE',
});

export default reducer;

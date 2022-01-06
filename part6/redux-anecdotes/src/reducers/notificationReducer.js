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

let timeoutID = 0;
export const setNotification =
  (userAction, anecdote, time) => async (dispatch) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'SET',
      data:
        userAction === 'vote'
          ? `you voted ${anecdote}`
          : `you created ${anecdote}`,
    });
    timeoutID = setTimeout(
      () =>
        dispatch({
          type: 'REMOVE',
        }),
      time * 1000
    );
  };

export const setErrorNotification = (error) => ({
  type: 'SET',
  data: error,
});



export default reducer;

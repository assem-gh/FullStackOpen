const notificationReducer = (state = null, { type, data }) => {
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
  (notification, time = 2) =>
  async (dispatch) => {
    clearTimeout(timeoutID);
    dispatch({
      type: 'SET',
      data: { ...notification },
    });
    timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE' });
    }, time * 1000);
  };

export default notificationReducer;

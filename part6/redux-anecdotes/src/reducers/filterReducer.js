const reducer = (state = null, { type, filter }) => {
  switch (type) {
    case 'SET_FILTER':
      return filter;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

export default reducer;
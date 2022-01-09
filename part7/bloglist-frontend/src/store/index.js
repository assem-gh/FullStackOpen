import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import notificationReducer from './reducers/notificationReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  notification: notificationReducer,
  users: usersReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

import { combineReducers } from 'redux';

// import all individual reducers
import UserReducer from './reducer-users.jsx';

export default combineReducers({
  users: UserReducer,
  // posts: PostReducer,
  // comments: CommentsReducer,
});


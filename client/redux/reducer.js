import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './modules/user';
import data from './modules/data';

export default combineReducers({
  routing: routerReducer,
  user,
  data,
});

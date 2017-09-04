//USER_LOGIN
import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions';

import {
  INIT,
  REDUX_INIT,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants'

const initialState = Immutable.fromJS({
  email: '',
  clientId: '',
  validationKey: '',
});

const reducer = handleActions({
  [USER_LOGIN]: (state, action) => state.withMutations(map => {
    map.set('email', action.payload.email);
    map.set('clientId', action.payload.clientId);
    map.set('validationKey', action.payload.validationKey);
  }),
  [USER_LOGOUT]: (state, action) => state.withMutations(map => {
    map.set('email', '');
  }),
}, initialState);

export default reducer;

export const setLoginData = createAction(USER_LOGIN);
export const logout = createAction(USER_LOGOUT);

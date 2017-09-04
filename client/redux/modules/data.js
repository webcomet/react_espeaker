import { push } from 'react-router-redux'
import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions';

import {
  INIT,
  REDUX_INIT,
  DATA_SET,
  DATA_SET_EVENT,
  DATA_CONTACT_ADD,
  DATA_FLIGHT_ADD,
  DATA_GROUND_ADD,
  DATA_HOTEL_ADD,
  DATA_UPDATE_OPTION,
  DATA_SAVE,
  USER_LOGOUT,
} from '../constants'

import { saveLoginData } from 'utils/storage';

const initialState = Immutable.fromJS({
  display_fields: {
    tabs: {},
  },
  event: {},
  header: {},
  loaded: false,
});

const reducer = handleActions({
  [DATA_SET]: (state, action) => {
    if (action.payload.success) {
      return state.withMutations(map => {
        action.payload.display_fields.tabs.map(tab => {
          map.setIn(['display_fields', 'tabs', tab.label], Immutable.fromJS(tab));
        });
        map.set('event', Immutable.fromJS(action.payload.event));
        map.set('header', Immutable.fromJS(action.payload.header));
        map.set('loaded', true);
      });
    } else {
      console.log('Error occurred.');
      return state;
    }
  },
  [DATA_SET_EVENT]: (state, action) => {
    const event = action.payload;
    return state.set('event', Immutable.fromJS(event));
  },
  [DATA_CONTACT_ADD]: (state, action) => {
    const contact = action.payload;
    const contacts = state.getIn(['event', 'EventContact'], Immutable.fromJS([])).toJS();
    contacts.push(contact);
    return state.setIn(['event', 'EventContact'], Immutable.fromJS(contacts));
  },
  [DATA_FLIGHT_ADD]: (state, action) => {
    const flightData = action.payload;
    const flight = {
      legs: [flightData]
    };
    const flights = state.getIn(['event', 'Flight'], Immutable.fromJS([])).toJS();
    flights.push(flight);
    return state.setIn(['event', 'Flight'], Immutable.fromJS(flights));
  },
  [DATA_GROUND_ADD]: (state, action) => {
    const ground = action.payload;
    const grounds = state.getIn(['event', 'Ground'], Immutable.fromJS([])).toJS();
    grounds.push(ground);
    return state.setIn(['event', 'Ground'], Immutable.fromJS(grounds));
  },
  [DATA_HOTEL_ADD]: (state, action) => {
    const hotel = action.payload;
    const hotels = state.getIn(['event', 'Hotel'], Immutable.fromJS([])).toJS();
    hotels.push(hotel);
    return state.setIn(['event', 'Hotel'], Immutable.fromJS(hotels));
  },
  [DATA_UPDATE_OPTION]: (state, action) => {
    const { path, value } = action.payload;
    return state.setIn(path, Immutable.fromJS(value));
  },
  [USER_LOGOUT]: (state, action) => {
    return state.set('loaded', false);
  },
}, initialState);

export default reducer;

export const setData = createAction(DATA_SET);
export const setEvent = createAction(DATA_SET_EVENT);
export const addContact = createAction(DATA_CONTACT_ADD);
export const addFlight = createAction(DATA_FLIGHT_ADD);
export const addGround = createAction(DATA_GROUND_ADD);
export const addHotel = createAction(DATA_HOTEL_ADD);
export const updateOption = createAction(DATA_UPDATE_OPTION);

export function loadData(clientId, validationKey, email) {
  return dispatch => {
    return fetch(`https://happy.espeakers.com/balboa3/clientscreen/index/${clientId}?validation_key=${validationKey}&email=${email}`)
      .then(
        res => {
          if (res.status >= 200 && res.status < 300) {
            res.json().then(data => {
              if (data.success) {
                saveLoginData(clientId, validationKey, email);
                dispatch(setData(data));
              } else {
                saveLoginData(clientId, validationKey, '');
                dispatch(push(`${clientId}/${validationKey}/login/1`));
              }
            });
          } else {
            res.json().then(res => console.log(res));
            saveLoginData(clientId, validationKey, '');
            dispatch(push(`${clientId}/${validationKey}/login/1`));
          }
        },
        error => {
          console.log('API Error occurred:', error);
          saveLoginData(clientId, validationKey, '');
          dispatch(push(`${clientId}/${validationKey}/login/2`));
        }
      );
  }
}

export function saveData(clientId, validationKey, email, event) {
  const formdata = new FormData();
  formdata.append('id', parseInt(clientId));
  formdata.append('validation_key', validationKey);
  formdata.append('email', email);
  formdata.append('event', JSON.stringify(event));
  return dispatch => {
    return fetch(`https://happy.espeakers.com/balboa3/clientscreen/update/`, {
      method: 'POST',
      body: formdata,
    });
  }
}

export function saveOthernote(clientId, validationKey, email, note) {
  const formdata = new FormData();
  formdata.append('id', parseInt(clientId));
  formdata.append('validation_key', validationKey);
  formdata.append('email', email);
  formdata.append('note', note);
  return dispatch => {
    return fetch(`https://happy.espeakers.com/balboa3/clientscreen/othernote/`, {
      method: 'POST',
      body: formdata,
    });
  }
}

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import logger from './middlewares/logger';
import rootReducer from './reducer';

export default function configure(history, initialState) {
  const create = (
    window.devToolsExtension ?
    window.devToolsExtension()(createStore)
    : createStore
  );

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    routerMiddleware(history),
    thunk,
  )(create);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer')
      store.replaceReducer(nextReducer)
    });
  }

  return store;
};

import { Router, Route, hashHistory as routehistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import 'whatwg-fetch';

import configure from './redux';
import makeRoutes from './routes';

const store = configure(routehistory);
const history = syncHistoryWithStore(routehistory, store);
const routes = makeRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

import Container from 'containers/Container';
import Login from 'containers/Login';
import Tab from 'containers/Tab';
import InvalidURL from 'components/InvalidURL';

export default function makeRoutes({ getState }) {

  const checkAuth = (nextState, replace) => {
    const { user } = getState();
    const { clientId, validationKey } = nextState.params;
    console.log(nextState);
    if (!(user.get('email') && clientId && validationKey)) {
      replace({ pathname: `/${clientId}/${validationKey}/login` });
    }
  }

  return (
    <Route>
      <IndexRedirect to="/" />
      <Route path="/" component={InvalidURL} />

      <Route path="/:clientId/:validationKey">
        <IndexRedirect to="tab/basic" />
        <Route path="login" component={Login} />
        <Route path="login/:errorId" component={Login} />
        <Route component={Container}>
          <Route path="tab/:tab" component={Tab} />
        </Route>
      </Route>

      <Route path="*" component={InvalidURL} />
    </Route>
  );
}

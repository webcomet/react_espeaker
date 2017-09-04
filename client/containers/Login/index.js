import React, { Component, PropTypes as T } from 'react';

import { loadSavedLoginData } from 'utils/storage';
import hoc from './hoc';

class Login extends Component {

  static propTypes = {
    push: T.func,
    setLoginData: T.func,
    params: T.object,
  }

  initiateLoginProcess = (clientId, validationKey, email) => {
    this.props.setLoginData({
      email
    });
    this.props.push(`/${clientId}/${validationKey}/tab/basic`);
  }

  handleLogin = (event) => {
    event.preventDefault();
    const email = this.refs.email.value;
    const { clientId, validationKey } = this.props.params;
    this.initiateLoginProcess(clientId, validationKey, email);
  }

  errorText = (errorId) => {
    switch (parseInt(errorId)) {
      case 1:
        return 'Invalid login information.';
      case 2:
        return 'Failed to get data from server.';
    }
  }

  componentDidMount() {
    const { clientId, validationKey } = this.props.params;
    const email = loadSavedLoginData(clientId, validationKey);
    if (email) {
      this.initiateLoginProcess(clientId, validationKey, email);
    }
  }

  render() {
    const { errorId } = this.props.params;
    return (
      <div className="container login-container">
        <div className="row page-header">
          <div className="logo-wrap">
            <img src="img/logo.png" className="img-responsive" />
          </div>
        </div>
        <form onSubmit={this.handleLogin}>
          <div className="row row-content">
            <div className="col-xs-12 login-content">
              {
                errorId && <div className="login-error">
                  {this.errorText(errorId)}
                </div>
              }
              <div className="form-group">
                <label htmlFor="email">Your email:</label>
                <input ref="email" type="text" id="email" className="form-control" defaultValue="test@test.com" />
              </div>
              <div className="button-wrap">
                <button type="submit">Log in</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default hoc(Login);

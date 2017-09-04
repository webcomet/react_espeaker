import React, { Component, PropTypes as T } from 'react';

import { saveLoginData } from 'utils/storage';
import LoadingIndicator from 'components/LoadingIndicator';
import Header from 'components/Header';
import SideNav from 'components/SideNav';
import hoc from './hoc';

class Container extends Component {

  static propTypes = {
    data: T.object,
    user: T.object,
    params: T.object,
    push: T.func,
    setData: T.func,
    logout: T.func,
  }

  state = {
    sidebarMobileVisible: false,
  }

  handleLogout = () => {
    const { clientId, validationKey } = this.props.params;
    const { logout, push } = this.props;
    logout();
    saveLoginData(clientId, validationKey, '');
    setTimeout(() => {
      push(`/${clientId}/${validationKey}/login`);
    }, 0);
  }

  clickDelegate = (e) => {
    const elm = e.target;
    if (elm.className.indexOf('sidebar-toggle') >= 0 || elm.parentNode.className.indexOf('sidebar-toggle') >= 0) {
      this.setState({
        sidebarMobileVisible: true,
      });
    } else if (elm.className.indexOf('sidebar-close') >= 0) {
      this.setState({
        sidebarMobileVisible: false,
      });
    }
  }

  componentDidMount() {
    const { loaded } = this.props.data;
    const { clientId, validationKey } = this.props.params;
    const email = this.props.user.get('email');
    if (!email) {
      this.props.push(`/${clientId}/${validationKey}/login`);
    } else if (email && !loaded) {
      const { user } = this.props;
      this.props.loadData(clientId, validationKey, email);
    }

    this.refs.container.addEventListener('click', this.clickDelegate);
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('click', this.clickDelegate);
  }

  render() {
    const { data, children, params } = this.props;
    const loaded = data.get('loaded');
    const { sidebarMobileVisible } = this.state;

    return (
      <div ref="container">
        {
          loaded ?
          <div className="container">
            <Header
              title={data.getIn(['header', 'title'], '')}
              subtitle={data.getIn(['header', 'subtitle'], '')}
              contactUsUrl={data.getIn(['header', 'contactus_url'], '')}
              profileUrl={data.getIn(['header', 'speaker', 'profile_url'], '')}
              onLogout={this.handleLogout} />
            <div className="row row-content">
              <SideNav
                name={data.getIn(['header', 'speaker', 'name'], '')}
                photoUrl={data.getIn(['header', 'speaker', 'photo_url'], '')}
                profileUrl={data.getIn(['header', 'speaker', 'profile_url'], '')}
                tabs={data.getIn(['display_fields', 'tabs'])}
                params={params}
                sidebarMobileVisible={sidebarMobileVisible} />
              {children}
            </div>
          </div>
          :
          <LoadingIndicator />
        }
      </div>
    );
  }
}

export default hoc(Container);

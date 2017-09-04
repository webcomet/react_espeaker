import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';


import hoc from './hoc';

class SideNav extends Component {

  static propTypes = {
    name: T.string.isRequired,
    photoUrl: T.string.isRequired,
    profileUrl: T.string.isRequired,
    tabs: T.object.isRequired,
    push: T.func.isRequired,
    params: T.object,
    sidebarMobileVisible: T.bool,
  }

  handleNavItemClick = (label) => {
    const { clientId, validationKey } = this.props.params;
    this.props.push(`/${clientId}/${validationKey}/tab/${label}`);
  }

  render() {
    const { tabs, name, photoUrl, profileUrl, sidebarMobileVisible } = this.props;
    const currentTab = this.props.params ? this.props.params.tab : 'basic';

    return (
      <div className={'col-md-3 sidebar' + (sidebarMobileVisible ? ' is-visible' : '')}>
        <div className="sidebar-close"></div>

        <div className="speaker-profile clearfix">
          <div className="profile-photo">
            <img className="img-responsive" src={photoUrl} />
          </div>
          <div className="speaker-name">
            {name}
          </div>
          <a className="handouts" href={profileUrl}>See handouts</a>
        </div>

        <div className="list-title">
          Event details:
        </div>

        <ul className="list-unstyled" id="tabs-list">
          {
            tabs.valueSeq().map((tab, i) => {
              const label = tab.get('label');
              return (
                <li
                  key={i}
                  className={currentTab == label || (i == 0 && !currentTab) ? 'tab-active' : ''}
                  onClick={this.handleNavItemClick.bind(this, label)}
                  >
                  {label}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default hoc(SideNav);

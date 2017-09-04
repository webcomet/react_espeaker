import React, { Component, PropTypes as T } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';



class Header extends Component {

  static propTypes = {
    title: T.string,
    subtitle: T.string,
    contactUsUrl: T.string,
    profileUrl: T.string,
    onLogout: T.func,
  }

  render() {
    const { title, subtitle, contactUsUrl, profileUrl } = this.props;
    return (
      <div className="row page-header">

        <div className="col-sm-3 logo-wrap">
          <img src="img/logo.png" className="img-responsive" />
        </div>

        <div className="col-sm-9 title-wrap">
          <h2>
            {title}
            <small>{subtitle}</small>
          </h2>

          <div className="pull-right header-links">
            <a className="contact-us" href={contactUsUrl} target="_blank">Contact Us</a>
            <a className="my-account" href={profileUrl}>My Account</a>
            <a className="logout" href="javascript:;" onClick={this.props.onLogout}>&nbsp;</a>
          </div>

        </div>

      </div>
    )
  }
}

export default Header;

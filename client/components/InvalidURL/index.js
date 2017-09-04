import React from 'react'

const InvalidURL = () => (
  <div className="container login-container">
    <div className="row page-header">
      <div className="logo-wrap">
        <img src="img/logo.png" className="img-responsive" />
      </div>
    </div>
    <div className="row row-content">
      <div className="col-xs-12 login-content">
        Event id and/or validation key not found in url.
      </div>
    </div>
  </div>
)

export default InvalidURL;

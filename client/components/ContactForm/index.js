import React, { Component, PropTypes as T } from 'react';
import classnames from 'classnames';

import FieldGroup from 'components/FieldGroup';

class ContactForm extends Component {

  static propTypes = {
    open: T.bool.isRequired,
    onSubmit: T.func,
  }

  formData = () => {
    const fields = ['cname', 'title', 'company', 'phone', 'email', 'fax', 'mobile', 'address', 'city', 'state', 'country', 'zip'];
    const data = {};
    fields.map(field => {
      data[field] = this.refs[field].getValue();
    });
    return data;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.formData());
    }
  }

  render() {
    const { open } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classnames('row add-contact-form', open ? 'is-visible' : '')}>
          <div className="box-wrapper clearfix">
            <div className="col-sm-4">
              <FieldGroup
                id="cname"
                ref="cname"
                type="text"
                label="Name"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="title"
                ref="title"
                type="text"
                label="Title"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="company"
                ref="company"
                type="text"
                label="Company"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="phone"
                ref="phone"
                type="tel"
                label="Phone"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="email"
                ref="email"
                type="email"
                label="Email"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="fax"
                ref="fax"
                type="text"
                label="Fax"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="mobile"
                ref="mobile"
                type="tel"
                label="Mobile Phone"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="address"
                ref="address"
                type="text"
                label="Address"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="city"
                ref="city"
                type="text"
                label="City"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="state"
                ref="state"
                type="text"
                label="State"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="country"
                ref="country"
                type="text"
                label="Country"
                />
            </div>
            <div className="col-sm-4">
              <FieldGroup
                id="zip"
                ref="zip"
                type="text"
                label="Zip code"
                />
            </div>
            <div className="clearfix" />
            <div className="button-wrap">
              <button type="submit">Add a contact</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default ContactForm;

import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import FieldGroup from 'components/FieldGroup';

class HotelForm extends Component {

  static propTypes = {
    open: T.bool.isRequired,
    onSubmit: T.func,
  }

  formData = () => {
    const fields = ['name', 'address', 'phone', 'city', 'zip', 'st', 'country', 'confirmation', 'checkindate_ISO8601', 'checkoutdate_ISO8601'];
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
        <div className={classnames('row add-hotel-form add-form', open ? 'is-visible' : '')}>
          <div className="box-wrapper clearfix">
            <div className="col-sm-4">
              <FieldGroup
                id="name"
                ref="name"
                type="text"
                label="Hotel name:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="confirmation"
                ref="confirmation"
                type="text"
                label="Confirmation number:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="checkindate_ISO8601"
                ref="checkindate_ISO8601"
                type="date"
                label="Check-in date:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="checkoutdate_ISO8601"
                ref="checkoutdate_ISO8601"
                type="date"
                label="Check-out date:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="phone"
                ref="phone"
                type="tel"
                label="Phone:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="address"
                ref="address"
                type="text"
                label="Street address:" />
            </div>

            <div className="col-sm-3">
              <FieldGroup
                id="city"
                ref="city"
                type="text"
                label="City:" />
            </div>

            <div className="col-sm-3">
              <FieldGroup
                id="st"
                ref="st"
                type="text"
                label="State:" />
            </div>

            <div className="col-sm-3">
              <FieldGroup
                id="country"
                ref="country"
                type="text"
                label="Country:" />
            </div>

            <div className="col-sm-3">
              <FieldGroup
                id="zip"
                ref="zip"
                type="text"
                label="ZIP:" />
            </div>

            <div className="button-wrap">
              <button type="submit">Add hotel details</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default HotelForm;

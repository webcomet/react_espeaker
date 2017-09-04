import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import FieldGroup from 'components/FieldGroup';

class GroundForm extends Component {

  static propTypes = {
    open: T.bool.isRequired,
    onSubmit: T.func,
  }

  formData = () => {
    const fields = ['description', 'transportmode', 'confirmation', 'pickupinstructions', 'starttime_ISO8601'];
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
        <div className={classnames('row add-ground-form add-form', open ? 'is-visible' : '')}>
          <div className="box-wrapper clearfix">
            <div className="col-sm-12">
              <FieldGroup
                id="description"
                ref="description"
                type="textarea"
                label="Description:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="starttime_ISO8601"
                ref="starttime_ISO8601"
                type="datetime"
                label="Departure date/time:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="transportmode"
                ref="transportmode"
                type="text"
                label="Departure mode:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="confirmation"
                ref="confirmation"
                type="text"
                label="Confirmation number:" />
            </div>

            <div className="col-sm-12">
              <FieldGroup
                id="pickupinstructions"
                ref="pickupinstructions"
                type="textarea"
                label="Pickup instructions:" />
            </div>

            <div className="button-wrap">
              <button type="submit">Add ground details</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default GroundForm;

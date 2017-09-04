import React, { Component, PropTypes as T } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import FieldGroup from 'components/FieldGroup';

class FlightForm extends Component {

  static propTypes = {
    open: T.bool.isRequired,
    onSubmit: T.func,
  }

  formData = () => {
    const fields = ['legarrive_ISO8601', 'legcarrier', 'legflightnum', 'legfrom', 'legleave_ISO8601', 'legto'];
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
        <div className={classnames('row add-flight-form add-form', open ? 'is-visible' : '')}>
          <div className="box-wrapper clearfix">
            <div className="col-sm-4">
              <FieldGroup
                id="legflightnum"
                ref="legflightnum"
                type="text"
                label="Flight number:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="legcarrier"
                ref="legcarrier"
                type="text"
                label="Carrier:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="legto"
                ref="legto"
                type="text"
                label="Departure city:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="legleave_ISO8601"
                ref="legleave_ISO8601"
                type="datetime"
                label="Departure date/time:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="legfrom"
                ref="legfrom"
                type="text"
                label="Arrival city:" />
            </div>

            <div className="col-sm-4">
              <FieldGroup
                id="legarrive_ISO8601"
                ref="legarrive_ISO8601"
                type="datetime"
                label="Arrival date/time:" />
            </div>

            <div className="button-wrap">
              <button type="submit">Add flight details</button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default FlightForm;

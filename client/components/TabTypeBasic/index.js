import React, { Component, PropTypes as T } from 'react';
import {
  Row, Col,
  Button,
} from 'react-bootstrap';

import FieldGroup from 'components/FieldGroup';

class TabTypeBasic extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    initialData: T.object.isRequired,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    updateOption: T.func.isRequired,
    onSave: T.func.isRequired,
  }

  composeField = (key, field) => {
    const { initialData } = this.props;
    let type = "text";

    const typeField = field.get('type');
    switch(typeField) {
      case 'date':
      case 'time':
        type = typeField;
        break;
    }

    const defaultValue = initialData[key];

    return (
      <FieldGroup
        id={key}
        ref={key}
        type={type}
        label={field.get('label')}
        help={field.get('hint')}
        readOnly={field.get('readonly')}
        defaultValue={defaultValue}
        />
    );
  }

  composeFieldArray = (fields) => {
    const fieldCount = fields.size;
    const fieldComponents = [];
    fields.map((field, key) => {
      fieldComponents.push(this.composeField(key, field));
    });
    const composedFields = [];
    let i = 0;
    while(fieldComponents.length > 0) {
      const fieldComponent1 = fieldComponents.pop();
      const fieldComponent2 = fieldComponents.length > 0 ? fieldComponents.pop() : null;
      composedFields.push(
        <Row key={i++}>
          <Col sm={6}>
            {fieldComponent1}
          </Col>
          {
            fieldComponent2 ?
            <Col sm={6}>
              {fieldComponent2}
            </Col>
            :
            undefined
          }
        </Row>
      );
    }
    return composedFields;
  }

  handleSave = () => {
    const { tabData, onSave } = this.props;
    const fields = tabData.get('fieldlist');
    const keyToPathMap = {
      venue_state: ['event', 'Venue', 0, 'st'],
      venue_address: ['event', 'Venue', 0, 'address'],
      venue_building: ['event', 'Venue', 0, 'building'],
      venue_country: ['event', 'Venue', 0, 'country'],
      venue_zip: ['event', 'Venue', 0, 'zip'],
      dress: ['event', 'dress'],
      venue_city: ['event', 'Venue', 0, 'city'],
      avcheck_time: ['event', 'Stagetime', 0, 'avchecktime_ISO8601'],
    }
    fields.map((field, key) => {
      const fieldComponent = this.refs[key];
      const path = keyToPathMap[key];
      if (!fieldComponent.props.readOnly && path) {
        this.props.updateOption({
          path,
          value: fieldComponent.getValue(),
        });
      }
    });
    if (this.refs['stagetime_date'] && this.refs['stagetime_time']) {
      const eventDatetimePath = ['event', 'Stagetime', 0, 'starttime_ISO8601'];
      const eventDate = new Date(this.refs['stagetime_date'].getValue());
      const eventTime = new Date(this.refs['stagetime_time'].getValue());
      eventDate.setHours(eventTime.getHours());
      eventDate.setMinutes(eventTime.getMinutes());
      eventDate.setSeconds(0);
      this.props.updateOption({
        path: eventDatetimePath,
        value: eventDate.toISOString(),
      });
    }
    if (onSave) {
      setTimeout(() => {
        onSave();
      }, 10);
    }
  }

  render() {
    const { tabData } = this.props;
    const fields = this.composeFieldArray(tabData.get('fieldlist'));

    return (
      <div className="col-md-9 main-content" id="tab-basic">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Basic</h4>
          <a className="save-changes esp-btn btn" onClick={this.handleSave}>Save</a>
        </div>
        <div className="tab-content row">
          <div className={`es-message alert alert-dismissible alert-${this.props.messageType} fade${this.props.messageOpen ? ' in' : ''}`}>
            <a href="javascript:;" className="close" onClick={this.props.onCloseMessage}>
              <span aria-hidden="true">&times;</span>
            </a>
            {this.props.messageText}
          </div>
          <div className="row">
            <div className="explanation clearfix">
              <div className="inner-wrap">
                <div className="img-wrap">
                  <img src="img/icon-info.png" />
                </div>
                <span className="text-wrap">
                  If you want to make a change to a field that is read-only, use the <strong>“What else we should know?”</strong> tab.
                </span>
              </div>
            </div>
          </div>
          {fields}
        </div>
      </div>
    );
  }
}

export default TabTypeBasic;

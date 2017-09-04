import React, { Component, PropTypes as T } from 'react';
import {
  Row, Col,
  Button,
} from 'react-bootstrap';
import Immutable from 'immutable';

import FieldGroup from 'components/FieldGroup';

class TabTypeCustom extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    customFields: T.object.isRequired,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    updateOption: T.func.isRequired,
    onSave: T.func.isRequired,
  }

  composeField = (key, field, value) => {
    const { initialData } = this.props;
    let type = "text";

    if (key.substr(0, 4).toLowerCase() == 'long') {
      type = "textarea";
    }

    return (
      <FieldGroup
        id={key}
        ref={key}
        type={type}
        label={field.get('label')}
        help={field.get('hint')}
        readOnly={field.get('readonly')}
        defaultValue={value}
        />
    );
  }

  composeFieldArray = (fields, customFields) => {
    const fieldCount = fields.size;
    const fieldComponents = [];
    fields.map((field, key) => {
      const customFieldId = field.get('custom_id').toString();
      const value = customFields.getIn(['contents', customFieldId], '');
      fieldComponents.push(this.composeField(key, field, value));
    });
    const composedFields = [];
    let i = 0;
    while(fieldComponents.length > 0) {
      const fieldComponent1 = fieldComponents.pop();
      const fieldComponent2 = fieldComponents.length > 0 ? fieldComponents.pop() : null;
      composedFields.push(
        <Row key={i++}>
          <Col md={6} lg={6} sm={12}>
            {fieldComponent1}
          </Col>
          {
            fieldComponent2 ?
            <Col md={6} lg={6} sm={12}>
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
    const { tabData, customFields, onSave } = this.props;
    const fields = tabData.get('fieldlist');
    if (!customFields.get('contents')) {
      this.props.updateOption({
        path: ['event', 'Customfields', 'contents'],
        value: Immutable.fromJS({}),
      });
    }
    fields.map((field, key) => {
      const fieldComponent = this.refs[key];
      if (!fieldComponent.props.readOnly) {
        const customFieldId = field.get('custom_id').toString();
        const path = ['event', 'Customfields', 'contents', customFieldId];
        this.props.updateOption({
          path,
          value: fieldComponent.getValue(),
        });
      }
    });
    if (onSave) {
      setTimeout(() => {
        onSave();
      }, 10);
    }
  }

  render() {
    const { tabData, customFields } = this.props;
    const fields = this.composeFieldArray(tabData.get('fieldlist'), customFields);

    return (
      <div className="col-md-9 main-content" id="tab-custom-fields">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Custom fields</h4>
          <a className="save-changes esp-btn btn" onClick={this.handleSave}>Save</a>
        </div>

        <div className="tab-content row">
          <div className={`es-message alert alert-dismissible alert-${this.props.messageType} fade${this.props.messageOpen ? ' in' : ''}`}>
            <a href="javascript:;" className="close" onClick={this.props.onCloseMessage}>
              <span aria-hidden="true">&times;</span>
            </a>
            {this.props.messageText}
          </div>
          {fields}
        </div>
      </div>
    );
  }
}

export default TabTypeCustom;

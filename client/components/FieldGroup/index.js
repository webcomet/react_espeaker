import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Tooltip,
} from 'react-bootstrap';
import DateTime from 'react-datetime';

class FieldGroup extends Component {

  state = {
    showTooltip: false,
  }

  showTooltip = () => {
    this.setState({
      showTooltip: true,
    });
  }

  hideTooltip = () => {
    this.setState({
      showTooltip: false,
    });
  }

  getValue = () => {
    const inputDOMNode = ReactDOM.findDOMNode(this.refs.control);
    if (this.props.type == "datetime") {
      const date = this.refs.control.state.selectedDate.toDate();
      return date.toISOString();
    } else if (this.props.type == "date") {
      const date = inputDOMNode.value ? new Date(inputDOMNode.value) : new Date();
      return date.toISOString();
    } else if (this.props.type == "time") {
      const times = inputDOMNode.value.split(':');
      const date = new Date();
      date.setHours(parseInt(times[0]));
      date.setMinutes(parseInt(times[1]));
      date.setSeconds(0);
      return date.toISOString();
    } else {
      return inputDOMNode.value;
    }
  }

  render() {
    const {id, label, help, type, ...props} = this.props;
    const { showTooltip } = this.state;
    const controlType = {};

    if (type == "textarea" || type == "select") {
      controlType.componentClass = type;
    } else {
      controlType.type = type;
    }

    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        {
          type == "datetime" ?
          <DateTime
            ref="control"
            className="field-group-input"
            {...props}
            onFocus={this.showTooltip}
            onBlur={this.hideTooltip}
          />
          :
          <FormControl
            ref="control"
            className="field-group-input"
            {...controlType}
            {...props}
            onFocus={this.showTooltip}
            onBlur={this.hideTooltip}
            />
        }
        {help && <Tooltip id={id} placement="bottom" className={showTooltip ? 'in' : ''}>{help}</Tooltip>}
      </FormGroup>
    );
  }
};

export default FieldGroup;

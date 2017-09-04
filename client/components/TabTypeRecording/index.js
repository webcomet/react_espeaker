import React, { Component, PropTypes as T } from 'react';

import FieldGroup from 'components/FieldGroup';

class TabTypeRecording extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    isRecording: T.bool,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    updateOption: T.func.isRequired,
    onSave: T.func.isRequired,
  }

  state = {
    value: false,
  }

  handleSelectedYes = (event) => {
    this.setState({
      value: true,
    });
  }

  handleSelectedNo = (event) => {
    this.setState({
      value: false,
    });
  }

  componentWillMount() {
    this.setState({
      value: this.props.isRecording,
    });
  }

  handleSave = () => {
    const { tabData, onSave } = this.props;
    const { value } = this.state;
    const path = ['event', 'key_values', 'IS_RECORDING'];
    this.props.updateOption({
      path,
      value: value ? 1 : 0,
    });
    if (onSave) {
      setTimeout(() => {
        onSave();
      }, 10);
    }
  }

  render() {
    const { tabData } = this.props;
    const { value } = this.state;

    return (
      <div className="col-md-9 main-content" id="tab-recording">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Recording permission</h4>
          <a className="save-changes esp-btn btn" onClick={this.handleSave}>Save</a>
        </div>

        <div className="tab-content row">
          <div className={`es-message alert alert-dismissible alert-${this.props.messageType} fade${this.props.messageOpen ? ' in' : ''}`}>
            <a href="javascript:;" className="close" onClick={this.props.onCloseMessage}>
              <span aria-hidden="true">&times;</span>
            </a>
            {this.props.messageText}
          </div>
          <p className="label-big">
            {tabData.get('displaymessage')}
          </p>
          <div className="recording-permission clearfix">
            <input
              type="radio"
              name="recordingPermission"
              id="recordingYes"
              className="field-group-input"
              checked={value}
              onChange={this.handleSelectedYes} />
            <label htmlFor="recordingYes">Yes</label>

            <input
              type="radio"
              name="recordingPermission"
              id="recordingNo"
              className="field-group-input"
              checked={!value}
              onChange={this.handleSelectedNo} />
            <label htmlFor="recordingNo">No</label>
          </div>
          {
            value && <p><a className="link-external" href={tabData.get('link')} target="_blank">Recording guidelines</a></p>
          }
        </div>
      </div>
    );
  }
}

export default TabTypeRecording;

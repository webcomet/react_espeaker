import React, { Component, PropTypes as T } from 'react';

import FieldGroup from 'components/FieldGroup';

class TabTypeSales extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    isSales: T.number,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    onSave: T.func.isRequired,
  }

  state = {
    selectedIndex: 0,
  }

  handleSelectOption = (event, selectedIndex) => {
    this.setState({
      selectedIndex,
    });
  }

  handleSave = () => {
    const { tabData, onSave } = this.props;
    const { selectedIndex } = this.state;
    const path = ['event', 'key_values', 'IS_SALES'];
    this.props.updateOption({
      path,
      value: selectedIndex.toString(),
    });
    if (onSave) {
      setTimeout(() => {
        onSave();
      }, 10);
    }
  }

  componentWillMount() {
    this.setState({
      selectedIndex: this.props.isSales || 0,
    });
  }

  render() {
    const { tabData } = this.props;
    const { selectedIndex } = this.state;
    const choices = tabData.get('choices');

    return (
      <div className="col-md-9 main-content" id="tab-sales">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Product sales</h4>
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
          <div className="sales-radios clearfix form-inline">
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="sales"
                  id="salesNone"
                  className="field-group-input"
                  checked={selectedIndex == 0}
                  onChange={(event) => this.handleSelectOption(event, 0)} /> None
              </label>
            </div>
            &nbsp;
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="sales"
                  id="salesPreorder"
                  className="field-group-input"
                  checked={selectedIndex == 1}
                  onChange={(event) => this.handleSelectOption(event, 1)} /> Pre-order
              </label>
            </div>
            &nbsp;
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="sales"
                  id="salesBack"
                  className="field-group-input"
                  checked={selectedIndex == 2}
                  onChange={(event) => this.handleSelectOption(event, 2)} /> Back of the room
              </label>
            </div>
          </div>
          {
            selectedIndex > 0 && <p><a className="link-external" href={tabData.get('link')} target="_blank">Product Information</a></p>
          }
        </div>
      </div>
    );
  }
}

export default TabTypeSales;

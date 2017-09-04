import React, { Component, PropTypes as T } from 'react';

import FieldGroup from 'components/FieldGroup';

class TabTypeOtherNote extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    otherNote: T.string,
    email: T.string.isRequired,
    clientId: T.number.isRequired,
    validationKey: T.string.isRequired,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    updateOption: T.func.isRequired,
    saveOthernote: T.func.isRequired,
    onSave: T.func.isRequired,
    onFinish: T.func.isRequired,
  }

  handleSave = () => {
    const { tabData, onSave } = this.props;
    const path = ['event', 'Othernote'];
    this.props.updateOption({
      path,
      value: this.refs.othernote.getValue(),
    });
    setTimeout(() => {
      this.callUpdateAPI();
    }, 10);
  }

  callUpdateAPI = () => {
    const { onSave, onFinish, saveOthernote } = this.props;
    if (onSave) {
      onSave();
    }

    const { clientId, validationKey, email } = this.props;
    const note = this.refs.othernote.getValue();

    saveOthernote(clientId, validationKey, email, note)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        res.json().then(data => {
          if (onFinish) { onFinish(data.message, 'success'); }
        });
      } else {
        if (onFinish) { onFinish('Unexpected error occurred', 'danger'); }
      }
    })
    .catch(err => {
      if (onFinish) { onFinish('Unexpected error occurred', 'danger'); }
    });
  }

  render() {
    const { tabData, otherNote } = this.props;

    return (
      <div className="col-md-9 main-content" id="tab-what-else">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>What else should we know?</h4>
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
          <div className="row">
            <div className="col-md-9">
              <FieldGroup
                id="othernote"
                ref="othernote"
                type="textarea"
                defaultValue={otherNote}
                rows={5} />
            </div>
          </div>
          <div>
            <button onClick={this.handleSave}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TabTypeOtherNote;

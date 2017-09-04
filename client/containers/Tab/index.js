import React, { Component, PropTypes as T } from 'react';
import { withRouter } from 'react-router';
import dateformat from 'dateformat';
import {
  Modal,
  Button,
} from 'react-bootstrap';

import TabTypeBasic from 'components/TabTypeBasic';
import TabTypeContacts from 'components/TabTypeContacts';
import TabTypeTravel from 'components/TabTypeTravel';
import TabTypeCustom from 'components/TabTypeCustom';
import TabTypeRecording from 'components/TabTypeRecording';
import TabTypeSales from 'components/TabTypeSales';
import TabTypeOtherNote from 'components/TabTypeOtherNote';
import LoadingIndicator from 'components/LoadingIndicator';
import hoc from './hoc';

class Tab extends Component {

  static propTypes = {
    data: T.object,
    router: T.object,
    route: T.object,
    setEvent: T.func,
    updateOption: T.func,
    saveData: T.func,
    saveOthernote: T.func,
  }

  state = {
    changed: false,
    saving: false,
    messageOpen: false,
    messageText: '',
  }

  handleOptionChange = (e) => {
    if (e.target && e.target.classList.contains('field-group-input')) {
      this.setState({
        changed: true,
      });
    }
  }

  handleSave = () => {
    this.setState({
      changed: false,
      saving: true,
    });

    const { clientId, validationKey } = this.props.params;
    const email = this.props.user.get('email');
    const data = this.props.data;
    const event = data ? data.get('event').toJS() : {};

    this.props.saveData(clientId, validationKey, email, event)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        res.json().then(data => {
          this.props.setEvent(data.event);
          this.hideSpinnerAndShowMessage(data.message, data.success ? 'success' : 'danger');
        });
      } else {
        this.hideSpinnerAndShowMessage('Unexpected error occurred', 'danger');
      }
    })
    .catch(err => {
      this.hideSpinnerAndShowMessage(err.toString(), 'danger');
    });
  }

  handleSaveWithManualUpdate = () => {
    this.setState({
      changed: false,
      saving: true,
    });
  }

  hideSpinnerAndShowMessage = (text, type) => {
    this.setState({
      saving: false,
      messageOpen: true,
      messageType: type,
      messageText: text,
    });
  }

  handleCloseMessage = () => {
    this.setState({
      messageOpen: false,
    });
  }

  tabContent = (tabData, data) => {
    const { updateOption, saveOthernote } = this.props;
    const { clientId, validationKey } = this.props.params;
    const { messageOpen, messageType, messageText } = this.state;
    const email = this.props.user.get('email');

    switch(tabData.get('tabtype')) {
      case 'basic':
        const startTime = new Date(data.getIn(['event', 'Stagetime', 0, 'starttime_ISO8601']));
        const avCheckTime = new Date(data.getIn(['event', 'Stagetime', 0, 'avchecktime_ISO8601']));
        const initialData = {
          venue_state: data.getIn(['event', 'Venue', 0, 'st']),
          stagetime_time: dateformat(startTime, "HH:mm", true),
          stagetime_date: dateformat(startTime, "yyyy-mm-dd"),
          venue_address: data.getIn(['event', 'Venue', 0, 'address']),
          venue_building: data.getIn(['event', 'Venue', 0, 'building']),
          venue_country: data.getIn(['event', 'Venue', 0, 'country']),
          venue_zip: data.getIn(['event', 'Venue', 0, 'zip']),
          dress: data.getIn(['event', 'dress']),
          avcheck_time: dateformat(avCheckTime, "HH:mm"),
          venue_city: data.getIn(['event', 'Venue', 0, 'city']),
        };
        return (
          <TabTypeBasic
            tabData={tabData}
            initialData={initialData}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'contacts':
        const contacts = data.getIn(['event', 'EventContact']);
        return (
          <TabTypeContacts
            tabData={tabData}
            contacts={contacts}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'travel':
        const flights = data.getIn(['event', 'Flight']);
        const ground = data.getIn(['event', 'Ground']);
        const hotel = data.getIn(['event', 'Hotel']);
        return (
          <TabTypeTravel
            tabData={tabData}
            flights={flights}
            ground={ground}
            hotel={hotel}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'customfields':
        const customFields = data.getIn(['event', 'Customfields']);
        return (
          <TabTypeCustom
            tabData={tabData}
            customFields={customFields}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'recording':
        return (
          <TabTypeRecording
            tabData={tabData}
            isRecording={!!parseInt(data.getIn(['event', 'key_values', 'IS_RECORDING']))}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'sales':
        return (
          <TabTypeSales
            tabData={tabData}
            isSales={parseInt(data.getIn(['event', 'key_values', 'IS_SALES']))}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            onSave={this.handleSave} />
        );
      case 'othernote':
        const otherNote = data.getIn(['event', 'Othernote']);
        return (
          <TabTypeOtherNote
            tabData={tabData}
            otherNote={otherNote}
            email={email}
            clientId={parseInt(clientId)}
            validationKey={validationKey}
            messageOpen={messageOpen}
            messageType={messageType}
            messageText={messageText}
            onCloseMessage={this.handleCloseMessage}
            updateOption={updateOption}
            saveOthernote={saveOthernote}
            onSave={this.handleSaveWithManualUpdate}
            onFinish={this.hideSpinnerAndShowMessage} />
        );
      default:
        return '';
    }
  }

  routeLeaveHook = () => {
    if (this.state.changed) {
      return 'You have unsaved information, are you sure you want to leave this page?';
    }
  }

  componentDidMount() {
    this.refs.thisComponent.addEventListener('change', this.handleOptionChange)
    this.props.router.setRouteLeaveHook(this.props.route, this.routeLeaveHook);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeParams.tab !== nextProps.routeParams.tab) {
      this.setState({
        changed: false,
        messageOpen: false,
        messageText: '',
      });
    }
  }

  render() {
    const tab = this.props.params.tab ? this.props.params.tab : 'basic';
    const { data } = this.props;
    const { saving, messageOpen, messageText } = this.state;
    const tabData = data.getIn(['display_fields', 'tabs', tab]);

    return (
      <div ref="thisComponent">
        {this.tabContent(tabData, data)}
        {
          saving && <div className="bg-saving">
            <LoadingIndicator />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(hoc(Tab));

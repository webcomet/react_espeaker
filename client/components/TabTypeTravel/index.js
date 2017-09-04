import React, { Component, PropTypes as T } from 'react';
import {
  Panel,
  Table,
} from 'react-bootstrap'

import TabTypeTravelFlights from 'components/TabTypeTravelFlights';
import TabTypeTravelGround from 'components/TabTypeTravelGround';
import TabTypeTravelHotel from 'components/TabTypeTravelHotel';


class TabTypeTravel extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    flights: T.object.isRequired,
    ground: T.object.isRequired,
    hotel: T.object.isRequired,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    onSave: T.func.isRequired,
  }

  render() {
    const { tabData, flights, ground, hotel, onSave } = this.props;

    return (
      <div className="col-md-9 main-content" id="tab-travel-plans">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Travel plans</h4>
        </div>
        <div className="tab-content row">
          <div className={`es-message alert alert-dismissible alert-${this.props.messageType} fade${this.props.messageOpen ? ' in' : ''}`}>
            <a href="javascript:;" className="close" onClick={this.props.onCloseMessage}>
              <span aria-hidden="true">&times;</span>
            </a>
            {this.props.messageText}
          </div>
          <TabTypeTravelFlights tabData={tabData} flights={flights} onSave={onSave} />
          <hr />
          <TabTypeTravelGround tabData={tabData} ground={ground} onSave={onSave} />
          <hr />
          <TabTypeTravelHotel tabData={tabData} hotel={hotel} onSave={onSave} />
        </div>
      </div>
    );
  }
}

export default TabTypeTravel;

import React, { Component, PropTypes as T } from 'react';
import classnames from 'classnames';

import FlightForm from 'components/FlightForm';
import hoc from './hoc';

class TabTypeTravelFlights extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    flights: T.object.isRequired,
    onSave: T.func.isRequired,
  }

  state = {
    isFormInitialized: false,
    flightFormVisible: false,
  }

  handleClickAddFlight = () => {
    this.setState({
      isFormInitialized: true,
      flightFormVisible: !this.state.flightFormVisible,
    });
  }

  handleSubmit = (flight) => {
    this.props.addFlight(flight);
    this.setState({
      isFormInitialized: false,
      flightFormVisible: false,
    });
    if (this.props.onSave) {
      setTimeout(() => {
        this.props.onSave();
      }, 10);
    }
  }

  render() {
    const { tabData, flights } = this.props;
    const { isFormInitialized, flightFormVisible } = this.state;
    let ui = 0;

    return (
      <div>
        <div className="section-title flights">
          <span className="title">Flights</span>
          {
            !tabData.getIn(['fieldlist', 'flights', 'readonly']) &&
            <a className="add add-flight" onClick={this.handleClickAddFlight}>Add</a>
          }
        </div>
        {
          (!tabData.getIn(['fieldlist', 'flights', 'readonly']) && isFormInitialized)
          && (
            <FlightForm open={flightFormVisible} onSubmit={this.handleSubmit} />
          )
        }
        <div className="section">
          {
            flights.map((flight, i) => (
              flight.get('legs').map((leg, j) => (
                <div className={classnames('row', (ui++) % 2 == 0 ? '' : 'odd')} key={leg.get('id')}>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Flight number:</label>
                      <p className="form-control-static blue">{leg.get('legflightnum')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Carrier:</label>
                      <p className="form-control-static">{leg.get('legcarrier')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Departure city:</label>
                      <p className="form-control-static">{leg.get('legfrom')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Departure date/time:</label>
                      <p className="form-control-static">{leg.get('legleave')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Arrival city:</label>
                      <p className="form-control-static">{leg.get('legto')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Arrival date/time:</label>
                      <p className="form-control-static">{leg.get('legarrive')}</p>
                    </div>
                  </div>

                </div>
              ))
            ))
          }
        </div>
      </div>
    );
  }
}

export default hoc(TabTypeTravelFlights);

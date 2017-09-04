import React, { Component, PropTypes as T } from 'react';
import classnames from 'classnames';
import dateformat from 'dateformat';

import HotelForm from 'components/HotelForm';
import hoc from './hoc';

class TabTypeTravelHotel extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    hotel: T.object.isRequired,
    onSave: T.func.isRequired,
  }

  state = {
    isFormInitialized: false,
    hotelFormVisible: false,
  }

  handleClickAddHotel = () => {
    this.setState({
      isFormInitialized: true,
      hotelFormVisible: !this.state.hotelFormVisible,
    });
  }

  handleSubmit = (hotel) => {
    this.props.addHotel(hotel);
    this.setState({
      isFormInitialized: false,
      hotelFormVisible: false,
    });
    if (this.props.onSave) {
      setTimeout(() => {
        this.props.onSave();
      }, 10);
    }
  }

  render() {
    const { tabData, hotel } = this.props;
    const { isFormInitialized, hotelFormVisible } = this.state;

    return (
      <div>
        <div className="section-title hotel">
          <span className="title">Hotel</span>
          {
            !tabData.getIn(['fieldlist', 'hotel', 'readonly']) &&
            <a className="add add-hotel" onClick={this.handleClickAddHotel}>Add</a>
          }
        </div>
        {
          (!tabData.getIn(['fieldlist', 'hotel', 'readonly']) && isFormInitialized)
          && <HotelForm open={hotelFormVisible} onSubmit={this.handleSubmit} />
        }
        <div className="section">
          {
            hotel.map((_hotel, i) => (
              <div className={classnames('row', i % 2 == 0 ? '' : 'odd')} key={i}>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Hotel name:</label>
                    <p className="form-control-static">{_hotel.get('name')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Confirmation number:</label>
                    <p className="form-control-static blue">{_hotel.get('confirmation')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Check-in date:</label>
                    <p className="form-control-static">{dateformat(_hotel.get('checkindate_ISO8601'), 'mmm dd, yyyy')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Check-out date:</label>
                    <p className="form-control-static">{dateformat(_hotel.get('checkoutdate_ISO8601'), 'mmm dd, yyyy')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Phone:</label>
                    <p className="form-control-static">{_hotel.get('phone')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Street address:</label>
                    <p className="form-control-static">{_hotel.get('address')}</p>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-group">
                    <label>City:</label>
                    <p className="form-control-static">{_hotel.get('city')}</p>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-group">
                    <label>State:</label>
                    <p className="form-control-static">{_hotel.get('st')}</p>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-group">
                    <label>Country:</label>
                    <p className="form-control-static">{_hotel.get('country')}</p>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="form-group">
                    <label>ZIP:</label>
                    <p className="form-control-static">{_hotel.get('zip')}</p>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default hoc(TabTypeTravelHotel);

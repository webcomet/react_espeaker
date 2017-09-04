import React, { Component, PropTypes as T } from 'react';
import dateformat from 'dateformat';
import classnames from 'classnames';

import GroundForm from 'components/GroundForm';
import hoc from './hoc';

class TabTypeTravelGround extends Component {

  static propTypes = {
    tabData: T.object.isRequired,
    ground: T.object.isRequired,
    onSave: T.func.isRequired,
  }

  state = {
    isFormInitialized: false,
    groundFormVisible: false,
  }

  handleClickAddGround = () => {
    this.setState({
      isFormInitialized: true,
      groundFormVisible: !this.state.groundFormVisible,
    });
  }

  handleSubmit = (ground) => {
    this.props.addGround(ground);
    this.setState({
      isFormInitialized: false,
      groundFormVisible: false,
    });
    if (this.props.onSave) {
      setTimeout(() => {
        this.props.onSave();
      }, 10);
    }
  }

  render() {
    const { tabData, ground } = this.props;
    const { isFormInitialized, groundFormVisible } = this.state;

    return (
      <div>
        <div className="section-title ground">
          <span className="title">Ground</span>
          {
            !tabData.getIn(['fieldlist', 'ground', 'readonly']) &&
            <a className="add add-ground" onClick={this.handleClickAddGround}>Add</a>
          }
        </div>
        {
          (!tabData.getIn(['fieldlist', 'ground', 'readonly']) && isFormInitialized)
          && <GroundForm open={groundFormVisible} onSubmit={this.handleSubmit} />
        }
        <div className="section">
          {
            ground.map((groundItem, i) => (
              <div className={classnames("row", i % 2 == 0 ? '' : 'odd')} key={i}>

                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Description:</label>
                    <p className="form-control-static description">{groundItem.get('description')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Departure date/time:</label>
                    <p className="form-control-static">{dateformat(groundItem.get('starttime_ISO8601'), 'mmm dd, yyyy')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Departure mode:</label>
                    <p className="form-control-static">{groundItem.get('transportmode')}</p>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-group">
                    <label>Pickup instructions:</label>
                    <p className="form-control-static description">{groundItem.get('pickupinstructions')}</p>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Confirmation number:</label>
                    <p className="form-control-static blue">{groundItem.get('confirmation')}</p>
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

export default hoc(TabTypeTravelGround);

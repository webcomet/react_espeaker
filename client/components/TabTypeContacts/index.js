import React, { Component, PropTypes as T } from 'react';

import ContactForm from 'components/ContactForm';
import hoc from './hoc';

class TabTypeContacts extends Component {

  static propTypes = {
    contacts: T.object.isRequired,
    tabData: T.object.isRequired,
    messageOpen: T.bool,
    messageType: T.string,
    messageText: T.string,
    onCloseMessage: T.func,
    addContact: T.func,
    onSave: T.func.isRequired,
  }

  state = {
    isFormInitialized: false,
    isAddFormVisible: false,
  }

  handleClickAddContact = () => {
    this.setState({
      isFormInitialized: true,
      isAddFormVisible: !this.state.isAddFormVisible,
    });
  }

  handleSubmit = (contact) => {
    this.props.addContact(contact);
    this.setState({
      isFormInitialized: false,
      isAddFormVisible: false,
    });
    if (this.props.onSave) {
      setTimeout(() => {
        this.props.onSave();
      }, 10);
    }
  }

  render() {
    const { contacts, tabData } = this.props;
    const { isFormInitialized, isAddFormVisible } = this.state;

    return (
      <div className="col-md-9 main-content" id="tab-contacts">
        <div className="tab-header row">
          <div className="sidebar-toggle">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <h4>Contacts</h4>
        </div>

        <div className="tab-content row">
          <div className={`es-message alert alert-dismissible alert-${this.props.messageType} fade${this.props.messageOpen ? ' in' : ''}`}>
            <a href="javascript:;" className="close" onClick={this.props.onCloseMessage}>
              <span aria-hidden="true">&times;</span>
            </a>
            {this.props.messageText}
          </div>
          <div className="section-title contacts">
            <span className="title">Contacts</span>
            <a className="add add-contact" onClick={this.handleClickAddContact}>Add</a>
          </div>
          {
            (!tabData.getIn(['fieldlist', 'contacts', 'readonly']) && isFormInitialized)
            && (
              <ContactForm open={isAddFormVisible} onSubmit={this.handleSubmit} />
            )
          }
          {
            contacts.map((contact, i) => (
              <div key={i}>
                <div className="row added-entry">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Title:</label>
                      <p className="form-control-static">{contact.get('title')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Name:</label>
                      <p className="form-control-static">{contact.get('cname')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Company:</label>
                      <p className="form-control-static">{contact.get('company')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Email:</label>
                      <p className="form-control-static">{contact.get('email')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone:</label>
                      <p className="form-control-static">{contact.get('phone')}</p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Mobile:</label>
                      <p className="form-control-static">{contact.get('mobile')}</p>
                    </div>
                  </div>
                </div>
                <hr/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default hoc(TabTypeContacts);

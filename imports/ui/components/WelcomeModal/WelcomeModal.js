import React from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import UserSettings from '../UserSettings/UserSettings';

const StyledWelcomeModal = styled(Modal)`
  .modal-body > p {
    margin-bottom: 15px;
  }

  .list-group {
    margin-bottom: 0;
  }
`;

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    autoBind(this);
  }

  componentWillMount() {
    Meteor.call('users.checkIfGDPRComplete', (error, complete) => {
      if (error) {
        console.warn(error);
        Bert.alert(error.reason, 'danger');
      } else {
        this.setState({ show: !complete });
      }
    });
  }

  handleSaveSettings() {
    Meteor.call('users.saveGDPRSettings', (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Settings saved!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="WelcomeModal">
        <StyledWelcomeModal backdrop="static" show={this.state.show} onHide={() => this.setState({ show: false })}>
          <Modal.Header>
            <h4>Welcome!</h4>
          </Modal.Header>
          <Modal.Body>
            <p className="modalText">We are happy to see you here at Nurorda Fantasy League App!</p>
            <p className="modalText">
                You have now <strong>100</strong> million coins to spend on transfers!
                The season starts very soon, so hurry up to assemble your team!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="success"
              onClick={() => {
                this.handleSaveSettings();
                this.setState({ show: false })
              }}
            >OK</Button>
          </Modal.Footer>
        </StyledWelcomeModal>
      </div>
    );
  }
}

WelcomeModal.propTypes = {
  // prop: PropTypes.string.isRequired,
};

export default WelcomeModal;

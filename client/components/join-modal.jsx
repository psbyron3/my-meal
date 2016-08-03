import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false }
  }

  close() {
    this.setState({
      show: false
    });
  }
  open() {
    this.setState({
      show: true
    })
  }

  render() {
    return(
      <Modal>
        <Modal.Header>
          {/*<h1>{this.props.selectedEvent.eventName}</h1>*/}
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    )
  }
}

export default JoinModal;

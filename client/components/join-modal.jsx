import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Grid, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';

class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  handleJoinEvent() {
    // axios()
  }

  close(e) {
    e.preventDefault();
    this.setState({
      showModal: false,
    });
  }

  open(e) {
    e.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  renderPic() {
    if (this.props.selectedEvent.eventPic) {
      return (
        <div>
          <Image className="modalImage" src={this.props.selectedEvent.eventPic} alt="Modal Picture" responsive />
        </div>
      );
    }
    return (<div></div>);
  }

  render() {
    let startTime = moment(this.props.selectedEvent.startDatetime).format('MMMM Do YYYY, h:mm');
    let endTime = moment(this.props.selectedEvent.endDatetime).format('h:mm');
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header>
          <h1>{this.props.selectedEvent.eventName}</h1>
        </Modal.Header>
        <Modal.Body>
          {this.renderPic()}
          <div className="eventDesc">
            <p>{this.props.selectedEvent.description}</p>
          </div>
          <div className="eventPrice">
            <h3>${this.props.selectedEvent.price}</h3>
          </div>
          <div>{this.props.selectedEvent.address}</div>
          <div>{startTime} - {endTime}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close}>Confirm</Button>
          <Button onClick={this.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { selectedEvent: state.selectedEvent };
}

export default connect(mapStateToProps)(JoinModal);

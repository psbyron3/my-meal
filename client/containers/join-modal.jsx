import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Grid, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';
import { joinEvent } from '../actions/index';
import { bindActionCreators } from 'redux';

// const userId = window.localStorage.userId;
// console.log('user id in join: ', userId);

class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: true };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
    this.alreadyJoined = this.alreadyJoined.bind(this);
  }

  handleJoinEvent() {
    return joinEvent(this.props.selectedEvent.id, this.props.userId)
      .then(() => {
        this.props.closeModal();
      });
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.closeModal();
  }

  close() {
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

  alreadyJoined() {
    const matchedEvent = this.props.userHistory.filter((event) => {
      return event.id === this.props.selectedEvent.id;
    });
    if (matchedEvent.length > 0) {
      return (<h6 className="alert">You are already attending this event.</h6>);
    }
    return (<span></span>);
  }

  authRender() {
    if (!this.props.authenticated) {
      return (
        <Modal.Footer>
          <div>
            <p> Please &nbsp;
              <a href="#">
                <Link to="signIn">Sign In</Link>
              </a> or&nbsp;
              <a href="#">
                <Link to="signUp">Sign Up</Link>
              </a> to join events!
            </p>
          </div>
        </Modal.Footer>
      );
    }
    return (
      <Modal.Footer>
        {this.alreadyJoined()}
        <Button onClick={this.handleJoinEvent}>Join</Button>
        <Button onClick={this.props.closeModal}>Cancel</Button>
      </Modal.Footer>
    );
  }

  renderPic() {
    if (this.props.selectedEvent.eventPic) {
      return (
        <div>
          <Image
            className="modalImage"
            src={this.props.selectedEvent.eventPic}
            alt="Modal Picture"
            responsive
          />
        </div>
      );
    }
    return (<div></div>);
  }

  render() {
    let startTime = moment(this.props.selectedEvent.startDatetime).format('MMMM Do YYYY, h:mm');
    let endTime = moment(this.props.selectedEvent.endDatetime).format('h:mm');
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header className="join-event-details">
          <h1 className="join-event-name">{this.props.selectedEvent.eventName}</h1>
          <div className="join-time-location">
            <div className="join-event-address">{this.props.selectedEvent.address}</div>
            <div className="join-event-time">{startTime} - {endTime}</div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {this.renderPic()}
          <div className="join-event-desc">
            <p>{this.props.selectedEvent.description}</p>
          </div>
        </Modal.Body>
        {this.authRender()}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedEvent: state.selectedEvent,
    userId: state.userInfo.id,
    authenticated: state.auth.authenticated,
    userHistory: state.userHistory,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinEvent }, dispatch);
}

JoinModal.propTypes = {
  selectedEvent: PropTypes.object,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  userId: PropTypes.number,
  authenticated: PropTypes.bool,
  userHistory: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinModal);

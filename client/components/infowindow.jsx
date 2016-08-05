import React, { Component } from 'react';
import { Popover, Button, Overlay } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';

class Infowindow extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
  }

  handleJoinEvent(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.key;
    });
    this.props.selectEvent(selectedEvent);
    this.props.openModal();
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      show: !this.state.show,
      target: e.target,
    });
  }

  render() {
    return (
      <Overlay show={this.state.show} target={this.state.target} placement="top">
        <Popover style={{ position: 'absolute', top: -20, left: -20 }}>
          <h5>{this.props.eventName}</h5>
          <h6>{this.props.address}</h6>
          <h6>{this.props.startTime} - {this.props.endTime}</h6>
          <Button onClick={this.handleJoinEvent}>Join</Button>
        </Popover>
      </Overlay>
    );
  }
}

function mapStateToProps(state) {
  return { allEvents: state.allEvents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Infowindow);

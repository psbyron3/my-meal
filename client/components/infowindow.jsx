import React, { Component } from 'react';
import { Popover, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';

class Infowindow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    return(
      <Popover>
        <h5>{this.props.eventName}</h5>
        <h6>{this.props.address}</h6>
        <h6>{this.props.startTime} - {this.props.endTime}</h6>
        <Button onClick={this.handleJoinEvent}>Join</Button>
      </Popover>
    )
  }
}

function mapStateToProps(state) {
  return { allEvents: state.allEvents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Infowindow);

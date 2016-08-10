import React, { Component } from 'react';
import { Popover, Button, Overlay } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';

class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = { target: null };
    this.style = {
      position: 'absolute',
      left: -20,
      top: -20,
    };
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }

  handleJoinEvent(e) {
    this.handleClick(e);
    this.props.openModal();
  }

  handleEnter(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.index;
    });
    // action creator that sets current selection
    this.props.selectEvent(selectedEvent);
    // function passed down as props to determine whether infowindow appears
    this.props.setCurrent(this.props.index);
    // function passed down as props to determine whether maplistentry should highlight
    this.props.setHoverEvent(this.props.index);
    // sets the position for the infowindow
    this.setState({
      target: e.target,
    });
  }

  handleOut(e) {
    e.preventDefault();
    this.props.setCurrent(null);
    this.props.setHoverEvent(null);
    this.setState({
      target: e.target,
    });
  }


  handleClick(e) {
    e.preventDefault();
    this.props.setCurrent(null);
    this.props.openModal();
  }

  render() {
    return (
      <div style={this.style} >
        <a
          href="#"
          className="marker"
          onClick={this.handleJoinEvent}
        >
          <img
            src="../assets/soup-marker.png"
            role="presentation"
            width="32px"
            height="40px"
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleOut}
          />
        </a>
        <Overlay
          show={this.props.currentMarker === this.props.index}
          target={this.state.target}
          placement="top"
        >
          <Popover>
            <h5>{this.props.eventName}</h5>
            <h6>{this.props.address}</h6>
            <h6>{this.props.startTime} - {this.props.endTime}</h6>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { allEvents: state.allEvents, selectedEvent: state.selectedEvent };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);

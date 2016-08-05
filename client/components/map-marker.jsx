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
  }

  handleJoinEvent(e) {
    this.handleClick(e);
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.index;
    });
    this.props.selectEvent(selectedEvent);
    this.props.openModal();
  }

  handleClick(e) {
    e.preventDefault();
    console.log('e.target=', e.target);
    this.props.setCurrent(this.props.index);
    this.setState({
      target: e.target,
    });
  }

  render() {
    return (
      <div style={this.style} >
        <a href="#" className="marker" onClick={this.handleClick}>
          <img
            src="../assets/map-marker.png"
            role="presentation"
            width="16px"
            height="32px"
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
            <Button onClick={this.handleJoinEvent}>Join</Button>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { allEvents: state.allEvents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);

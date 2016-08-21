import React, { Component, PropTypes } from 'react';
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
    this.props.setCurrent(0);
    this.props.setHoverEvent(0);
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
    console.log('type of this.props.startTime:', typeof this.props);
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
          <Popover id={this.props.eventName}>
            <h5>{this.props.eventName}</h5>
            <p>{this.props.address}</p>
            <p>{this.props.startTime} - {this.props.endTime}</p>
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

MapMarker.propTypes = {
  allEvents: PropTypes.array,
  openModal: PropTypes.func,
  index: PropTypes.number,
  selectEvent: PropTypes.func,
  setCurrent: PropTypes.func,
  setHoverEvent: PropTypes.func,
  location: PropTypes.object,
  currentMarker: PropTypes.number,
  eventName: PropTypes.string,
  address: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);

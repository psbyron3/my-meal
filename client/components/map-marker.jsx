import React, { Component } from 'react';
import Infowindow from './infowindow.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { OverlayTrigger } from 'react-bootstrap';
import { selectEvent } from '../actions/index.js';

class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSelectedEvent = this.setSelectedEvent.bind(this);
    this.style = {
      position: 'absolute',
      left: -20,
      top: -20,
      zIndex:2
    };

  }

  setSelectedEvent(e) {
    e.preventDefault();
    // const selectedEvent = this.props.allEvents.find((event) => {
    //   return event.id === this.props.key;
    // });
    // this.props.selectEvent(selectedEvent);
    // this.props.openModal();
  }

  render() {
    const infowindow = (<Infowindow {...this.props} setSelectedEvent={this.setSelectedEvent}/>);
    return(
      <div style={this.style}>
        <OverlayTrigger trigger="click" placement="top" overlay={infowindow}>
          <img
            src="../assets/map-marker.png"
            style={{width:'32px', height:'32px'}}
            role="presentation"/>
        </OverlayTrigger>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { allEvents: state.allEvents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapMarker);

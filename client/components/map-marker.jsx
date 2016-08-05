// import React, { Component } from 'react';
// import Infowindow from './infowindow.jsx';
// import { OverlayTrigger } from 'react-bootstrap';
//
// const MapMarker = (props) => {
//   const style = {
//     position: 'absolute',
//     left: -20,
//     top: -20,
//   };
//   const infowindow = (<Infowindow {...props} />);
//
//   return (
//     <div style={style}>
//       <OverlayTrigger trigger="click" placement="top" overlay={infowindow}>
//         <img
//           src="../assets/map-marker.png"
//           style={{ width: '32px', height: '32px' }}
//           role="presentation"
//         />
//       </OverlayTrigger>
//
//     </div>
//   );
// };
//
// export default MapMarker;

import React, { Component } from 'react';
import { Popover, Button, Overlay } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';


class MapMarker extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.style = {
      position: 'absolute',
      left: -20,
      top: -20,
    };
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleJoinEvent(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.key;
    });
    this.props.selectEvent(selectedEvent);
    this.setState({
      show: !this.state.show,
      target: e.target,
    });
    this.props.openModal();
  }

  handleClick(e) {
    e.preventDefault();
    console.log('e.target=', e.target);
    this.setState({
      show: !this.state.show,
      target: e.target,
    });
  }

  render() {
    return (
      <div style={this.style} >
        <button className="marker" onClick={this.handleClick}>

        </button>
        <Overlay show={this.state.show} target={this.state.target} placement="top">
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';
import { Cell } from 'fixed-data-table';


class MapListEntry extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    // this.handleOut = this.handleOut.bind(this);
  }

  handleEnter(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.index;
    });
    // action creator that sets current selection
    this.props.selectEvent(selectedEvent);
  }

  render() {
    return (
      <Cell>
        <div
          onClick={this.props.openModal}
          className={this.props.entryClass}
          key={this.props.key}
          index={this.props.index}
          onMouseEnter={this.handleEnter}
        >
          <div className="event-name">
            <strong>{this.props.eventName}</strong>
          </div>
          <div className="event-location">
            {this.props.address}
          </div>
          <div className="event-start-to-end">
            {this.props.times}
          </div>
          <div className="event-description">
            {this.props.description}
          </div>
          <div className="event-maxGuests">
            Max Guests: {this.props.maxGuests}
          </div>
          <div className="event-price">
            $ {this.props.price}
          </div>
        </div>
      </Cell>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEvents: state.allEvents,
    selectedEvent: state.selectedEvent,
  };
}

// function renderPriceColumn(events) {
//   return (
//     <div className="price-column">
//       {events.price}
//     </div>
//   )
// }

// function renderEventInfoColumn(events) {
//   return (
//     <div className="event-column">
//       <div className='event-name'>
//         {events.eventName}
//       </div>
//       <div className="event-address">
//         {events.address}
//       </div>
//       <div className="event-start-to-end">
//         {event.startDatetime} to {event.endDatetime}
//       </div>
//     </div>
//   )
// }

// function renderMoreInfoColumn(events) {
//   <div className='info-column'>
//     <button className="btn btn-primary">More Info</button>
//   </div>
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapListEntry);

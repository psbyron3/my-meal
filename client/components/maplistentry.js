import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class MapListEntry extends Component {

  renderList() {
    console.log('type of classNames:', typeof classNames);
    return this.props.allEvents.map((event) => {
      const entryClass = classNames({
        'list-entry': true,
        'selected-entry': event.id === this.props.hoverEvent,
      });
      return (
        <div className={entryClass} key={event.id}>
          <div className="event-name">
            <strong>{event.eventName}</strong>
          </div>
          <div className="event-location">
            {event.address}
          </div>
          <div className="event-start-to-end">
            {event.startDatetime} - {event.endDatetime}
          </div>
          <div className="event-description">
            {event.description}
          </div>
          <div className="event-maxGuests">
            Max Guests: {event.maxGuests}
          </div>
          <div className="event-price">
            $ {event.price}
            <button className="btn btn-primary">More Info</button>
          </div>
        </div>

      );
    });
  }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>

    );
  }
}


// const events = this.props.allEvents;

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

export default connect(mapStateToProps)(MapListEntry);

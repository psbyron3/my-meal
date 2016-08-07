import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapListEntry from './maplistentry';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';


// Table data as a list of array.
// function rowGetter() {

// }
// Render your table
class MapList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderList() {
    console.log('openModal:', typeof this.props.openModal);
    return this.props.allEvents.map((event) => {
      const entryClass = classNames({
        'list-entry': true,
        'selected-entry': event.id === this.props.hoverEvent,
      });
      return (<MapListEntry
        hoverEvent={this.props.hoverEvent}
        openModal={this.props.openModal}
        entryClass={entryClass}
        key={event.id}
        index={event.id}
        image={event.eventPic}
        eventName={event.eventName}
        address={event.address}
        times={`${event.startDatetime} to ${event.endDatetime}`}
        description={event.description}
        maxGuests={event.maxGuests}
        price={event.price}
      />);
    });
  }

  render() {
    const rows = this.state.allEvents ?
      this.state.allEvents.length
      :
      1;
    return (
      <div className="event-list">
        <div>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('All Events in state, map comp : ', state.allEvents);
  return {
    allEvents: state.allEvents,
    selectedEvent: state.selectedEvent,
  };
}


export default connect(mapStateToProps)(MapList);

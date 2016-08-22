import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapListEntry from './maplistentry';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

class MapList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderList() {
    return this.props.allEvents.map((event) => {
      const entryClass = classNames({
        'list-entry': true,
        'selected-entry': event.id === this.props.hoverEvent,
      });
      return (
        <MapListEntry
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
          attending={event.attending}
          price={event.price}
          rating={event.Users[0].avgRating || 5}
          chefPic={event.Users[0].userPic}
        />);
    });
  }

  render() {
    return (
      <div className="event-list">
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEvents: state.allEvents,
    selectedEvent: state.selectedEvent,

  };
}

MapList.propTypes = {
  allEvents: PropTypes.array,
  openModal: PropTypes.func,
  hoverEvent: PropTypes.number,
};

export default connect(mapStateToProps)(MapList);

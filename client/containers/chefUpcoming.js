import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefUpcomingEntry from './chefUpcomingEntry';

const _ = require('lodash');

class ChefUpcoming extends Component {

  organizeEvents(allEvents) {
    const currentDate = new Date(Date.now());
    let chefPastEvents;

    new Promise((resolve, reject) => {
      chefPastEvents = _.filter(allEvents, (event) => {
        return Date.parse(event.startDatetime) > Date.parse(currentDate);
      });
      resolve(chefPastEvents);
    })
      .then((result) => {
        result.sort((a, b) => {
          return Date.parse(b.startDatetime) - Date.parse(a.startDatetime);
        });
      });
    return chefPastEvents;
  }

  renderList() {
    console.log('PROOOOOOOOPS: ', this.props);
    if (this.props.chefEvents === undefined) {
      return (
        <div>
        </div>
      );
    }
    return this.organizeEvents(this.props.chefEvents).map((event) => {
      console.log('EVEEEEEEEEEEEEEENT: ', event);
      return (
        <div>
          <div>
            <button> chat </button>
          </div>
          {event.id}
          <br />
          {event.eventName}
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

function mapStateToProps(state) {
  return {
    chefEvents: state.chefEvents.allChefEvents,
    eventId: state.eventId.id,
  };
}

export default connect(mapStateToProps)(ChefUpcoming);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { organizeChefUpcoming } from '../utils/helper';
import { EventIdFunc, DeleteEvent, ChatBoxFunc } from '../actions/index';
import ChefUpcomingEntry from './chefEntry';

const _ = require('lodash');


class ChefUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  // organizeEvents(allEvents) {
  //   const currentDate = new Date(Date.now());
  //   let chefPastEvents;

  //   new Promise((resolve, reject) => {
  //     chefPastEvents = _.filter(allEvents, (event) => {
  //       return Date.parse(event.startDatetime) > 1471032409000;
  //     });
  //     resolve(chefPastEvents);
  //   })
  //     .then((result) => {
  //       result.sort((a, b) => {
  //         return Date.parse(b.startDatetime) - Date.parse(a.startDatetime);
  //       });
  //     });
  //   return chefPastEvents;
  // }

  onHandleClick(e, evName) {
    new Promise((resolve, reject) => {
      resolve(this.props.ChatBoxFunc('false'));
    }).then(() => {
      return this.props.EventIdFunc(e, evName);
    }).then(() => {
      return this.props.ChatBoxFunc('true');
    });
  }

  renderList() {
    console.log('PROOOOOOOOPS: ', this.props.chefEvents);
    if (this.props.chefEvents === undefined) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefEvents.map((event) => {
      console.log('INSIDE RENDERLIST RETURN ', event);
      return (
        <ChefUpcomingEntry
          key={event.id}
          eventName={event.eventName}
          eventId={event.id}
          rating={event.rating}
          clicked={this.onHandleClick}
          deleteEvent={this.props.DeleteEvent}
        />
      );
      // return (
      //   <div>
      //     <div>
      //       <button> chat </button>
      //     </div>
      //     {event.id}
      //     <br />
      //     {event.eventName}
      //     <br />
      //     rating: {event.rating}
      //   </div>
      // );
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
    chefEvents: organizeChefUpcoming(state.chefEvents.allChefEvents),
    eventId: state.eventId.id,
  };
}

ChefUpcoming.propTypes = {
  chefEvents: PropTypes.array,
  ChatBoxFunc: PropTypes.func,
  DeleteEvent: PropTypes.func,
  EventIdFunc: PropTypes.func
};

export default connect(mapStateToProps, { EventIdFunc, DeleteEvent, ChatBoxFunc })(ChefUpcoming);

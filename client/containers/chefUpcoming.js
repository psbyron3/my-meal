import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { organizeChefUpcoming } from '../utils/helper';
import { EventIdFunc, DeleteEvent, ChatBoxFunc } from '../actions/index';
import ChefUpcomingEntry from './chefEntry';

class ChefUpcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHandleClick = this.onHandleClick.bind(this);
  }

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
    if (this.props.chefEvents === undefined) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefEvents.map((event) => {
      return (
        <ChefUpcomingEntry
          key={event.id}
          eventName={event.eventName}
          eventId={event.id}
          rating={event.rating}
          clicked={this.onHandleClick}
          deleteEvent={this.props.DeleteEvent}
          image={event.eventPic}
        />
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
    chefEvents: organizeChefUpcoming(state.chefEvents.allChefEvents),
    eventId: state.eventId.id,
  };
}

ChefUpcoming.propTypes = {
  chefEvents: PropTypes.array,
  ChatBoxFunc: PropTypes.func,
  DeleteEvent: PropTypes.func,
  EventIdFunc: PropTypes.func,
};

export default connect(mapStateToProps, { EventIdFunc, DeleteEvent, ChatBoxFunc })(ChefUpcoming);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { organizeChefPast } from '../utils/helper';
import { EventIdFunc, ChatBoxFunc, DeleteEvent } from '../actions/index';
import ChefPastEntry from './chefEntry';

class ChefPast extends Component {
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
    if (!this.props.chefPastEvents.length) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefPastEvents.map((pastEvent) => {
      return (
        <ChefPastEntry
          key={pastEvent.id}
          eventName={pastEvent.eventName}
          eventId={pastEvent.id}
          deleteEvent={this.props.DeleteEvent}
          clicked={this.onHandleClick}
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
    chefPastEvents: organizeChefPast(state.chefEvents.allChefEvents),
  };
}

ChefPast.propTypes = {
  chefPastEvents: PropTypes.array,
  EventIdFunc: PropTypes.func,
  DeleteEvent: PropTypes.func,
  ChatBoxFunc: PropTypes.func,
};

export default connect(mapStateToProps, { EventIdFunc, ChatBoxFunc, DeleteEvent })(ChefPast);

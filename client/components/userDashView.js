import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';

import UserReview from './userDashReview';

const now = moment().format();

class userDashView extends Component {
  constructor(props) {
    super(props);
    this.state = { hoverEvent: 0 };
    this.setHoverEvent = this.setHoverEvent.bind(this);
  }

  setHoverEvent(index) {
    this.setState({
      hoverEvent: index,
    });
  }

  renderList() {
    if (!this.props.userHistory.length) {
      return (<div> No reviews to give </div>);
    }
    return this.props.userHistory
      .filter((event) => {
        console.log('now is.....', now, 'of type', typeof now);
        console.log('endDatetime is......', event.endDatetime, 'of type', typeof event.endDatetime);
        return event.endDatetime <= now && !event.UsersEvent.wasReviewed;
      })
      .map((event, index) => {
        return (
          <UserReview
            hoverEvent={this.props.hoverEvent}
            key={event.id}
            index={event.id}
            eventName={event.eventName}
            eventPic={event.eventPic}
            date={event.startDatetime}
            price={event.price}
            hostId={event.UsersEvent.userId}
          />
        );
      });
  }

  render() {
    return (
      <div className="review-list-container">
        {this.renderList()}
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    userHistory: state.userHistory,
  };
}

userDashView.PropTypes = {
  userHistory: PropTypes.array,
};

export default connect(mapStateToProps)(userDashView);

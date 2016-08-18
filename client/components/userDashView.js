import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import UserReview from './userDashReview';

const now = moment().format();

class userDashView extends Component {


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
            key={index}
            eventName={event.eventName}
            chefPic={"this is where the chef goes"}
            date={event.startDatetime}
            price={event.price}
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
  // console.log('in UDV checking state :', state.userHistory);
  return {
    userHistory: state.userHistory,
  };
}

export default connect(mapStateToProps)(userDashView);

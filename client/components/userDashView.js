import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import UserReview from './userDashReview';

let now = moment();

class userDashView extends Component {


  renderList() {
    if (!this.props.userHistory.length) {
      return (<div> No reviews to give </div>);
    }

    return this.props.userHistory.filter((events) => events.endDatetime <= now)
      console.log("in filtered event UDV : ", event)
      .map((event) => {
        // if(!event.UsersEvent.wasReviewed) {

        return (
          <UserReview
            key={event.id}
            eventName={event.eventName}
            chefPic={"this is where the chef goes"}
            date={event.startDatetime}
            price={event.price}
          />
        );
      })
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
  console.log('in UDV checking state :', state.userHistory)
  return {
    userHistory: state.userHistory,
  };
}

export default connect(mapStateToProps)(userDashView);

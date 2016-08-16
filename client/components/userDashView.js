import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserReview from './userDashReview';

class userDashView extends Component {


  renderList() {
    if (!this.props.userHistory.length) {
      return (<div> No reviews to give </div>);
    }

    return this.props.userHistory.filter((event) =>
      event.endDateTime < new Date())
      .map((event) => {
        // if(!event.UsersEvent.wasReviewed) {

        return (
          <UserReview
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
  return {
    userHistory: state.userHistory,
  };
}

export default connect(mapStateToProps)(userDashView);

import React, { Component, PropTypes } from 'react';
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
      .filter((time) => {
        // console.log('UDV FILTER EVENTS : ', time);
        // console.log('MOMENT TIME : ', now);
        return time.endDatetime <= now;
      })
      .map((event, index) => {
        // if(!event.UsersEvent.wasReviewed) {
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

userDashView.PropTypes = {
  userHistory: PropTypes.array,

};

export default connect(mapStateToProps)(userDashView);

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
      .filter((time) => {
        return time.endDatetime <= now;
      })
      .map((event, index) => {
        // if(!event.UsersEvent.wasReviewed) {
        return (

          <UserReview
            hoverEvent={this.props.hoverEvent}
            key={event.id}
            index={event.id}
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

userDashView.PropTypes = {
  userHistory: PropTypes.array,
};

export default connect(mapStateToProps)(userDashView);

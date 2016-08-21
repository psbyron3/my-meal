import React, { Component, PropTypes } from 'react';
import PastReview from './userPastReview';

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // renderPastReviews() {
  //   return this.props.reviews.map((review) => {
  //     return (
  //       <PastReview
  //         key={}
  //         eventName={}
  //         date={}
  //         index={}
  //         rating={}
  //         eventPic={}
  //       />
  //     )
  //   })
  // }

  render() {
    return (
      <div>

      </div>)
    ;
  }
}

function mapStateToProps(state) {
  return { reviews: state.reviews };
}

export default ReviewList;

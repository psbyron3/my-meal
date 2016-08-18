import React, { Component, PropTypes, ReactDOM } from 'react';
import { connect } from 'react-redux';
import { postUserReviewOfChef } from '../actions/index';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import { Col, FormControl, textarea, Image } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const userId = window.localStorage.userId;

class UserReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      rating: 0,
      eventId: 2,
      reviewerId: userId,
      hostId: 4,
    };
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
  }


  onCommentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onReviewSubmit(event) {
    console.log('THE EVENT TARGET IN REVIEW SUBMIT : ', event.target);
    event.preventDefault();

    this.props.postUserReviewOfChef(this.state);
    this.props.wasReviewed = true;
  }

  onStarClick(name, value) {
    this.setState({ rating: value });
  }

  render() {
    // console.log('UDReview userHistory', this.props.userHistory);
    const { rating } = this.state;
    return (
      <div>
        <Col className="review-gutter" md={2} />
        <Col className="review-container" md={8}>
          <div className="review-event-basics">
            <div className="review-event-image">
              <Image
                src="../assets/stock-chef.jpg"
                role="presentation"
                circle
              />
            </div>
            <div className="review-event-details">
              <div className="review-event-title">
                <strong>{this.props.eventName}</strong>
              </div>
              <div className="review-event-date">
                {this.props.date}
              </div>
            </div>
          </div>
          <form className="review-rating-container" >
            <StarRatingComponent
              name={this.props.index}
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick}
            />
            <div className="review-comments">
              <textarea onChange={this.onCommentChange} />
            </div>
            <button
              type="submit"
              onClick={this.onReviewSubmit}
              className="btn btn-primary"
            >Submit Rating
            </button>
          </form>
        </Col>
        <Col className="review-gutter" md={2} />
      </div>

    );
  }
}


function mapStateToProps(state) {
  // console.log('mStoP in UDReview:', state.userHistory);

  return {
    userHistory: state.userHistory,
    Review: state.review,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postUserReviewOfChef }, dispatch);
}

UserReview.propTypes = {
  postUserReviewOfChef: PropTypes.func,
  userHistory: PropTypes.array,
  eventName: PropTypes.string,

};

export default connect(mapStateToProps, mapDispatchToProps)(UserReview);


 // <div
 //              key={this.props.key}
 //              index={this.props.index}
 //              onClick={this.setRating}
 //            >
 //              <div className="review-rating">
 //                <span value={1}>☆</span>
 //                <span value={2}>☆</span>
 //                <span value={3}>☆</span>
 //                <span value={4}>☆</span>
 //                <span value={5}>☆</span>
 //              </div>
 //            </div>


 // // Responsible for recording the star rating of the review
  // setRating(event) {
  //   const rating = event.target.getAttribute('value');

  //   this.setState({ rating }, () => {
  //     console.log("Star-rating is: ", this.state.rating)
  //   })
  // }

  // initStars = () => {
  //   this.stars = document.querySelectorAll('.review-rating span');
  //   for (let i = 0; i < this.stars.length; i++) {
  //     this.stars[i].setAttribute('data_count', i);
  //     this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
  //   }
  //   document.querySelector('.review-rating').addEventListener('mouseleave',
  //     this.leaveStarListener.bind(this));
  // }

  // enterStarListener = (event) => {
  //   this.fillStarsUpToElement(event.target);
  // }

  // leaveStarListener = () => {
  //   this.fillStarsUpToElement(null);
  // }

  // fillStarsUpToElement = (element) => {
  //   // remove the hover states
  //   for (let i = 0; i < this.stars.length; i++) {
  //     if (element === null || this.stars[i].getAttribute('data_count') > element.getAttribute('data_count')) {
  //       this.stars[i].classList.remove('hover');
  //     } else {
  //       this.stars[i].classList.add('hover');
  //     }
  //   }
  // }

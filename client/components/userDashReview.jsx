import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postUserReviewOfChef } from '../actions/index';
import { bindActionCreators } from 'redux';

import { Col, FormControl, textarea, Image } from 'react-bootstrap';

const userId = window.localStorage.userId;

class UserReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      rating: null,
      eventId: 2,
      reviewerId: userId,
      hostId: 4,
    };
    this.onCommentChange = this.onCommentChange.bind(this);
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.setRating = this.setRating.bind(this);
  }

  componentDidMount() {
    this.initStars();
  }

  onCommentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onReviewSubmit(event) {
    event.preventDefault();

    this.props.postUserReviewOfChef(this.state);
  }

  // Responsible for recording the star rating of the review
  setRating(event) {
    const rating = event.target.getAttribute('value');

    this.setState({
      rating,
    }, () => { console.log('This is the state ', this.state.rating); });
  }

  initStars = () => {
    this.stars = document.querySelectorAll('.review-rating span');
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].setAttribute('data_count', i);
      console.log('data-count for stars: ', this.stars[i].data_count);
      this.stars[i].addEventListener('mouseenter', this.enterStarListener.bind(this));
    }
    document.querySelector('.review-rating').addEventListener('mouseleave',
      this.leaveStarListener.bind(this));
  }

  enterStarListener = (event) => {
    this.fillStarsUpToElement(event.target);
  }

  leaveStarListener = () => {
    this.fillStarsUpToElement(null);
  }

  fillStarsUpToElement = (element) => {
    // remove the hover states
    for (let i = 0; i < this.stars.length; i++) {
      if (element === null || this.stars[i].getAttribute('data_count') > element.getAttribute('data_count')) {
        this.stars[i].classList.remove('hover');
      } else {
        this.stars[i].classList.add('hover');
      }
    }
  }

  renderList() {

  }


  render() {
    console.log('UDReview userHistory', this.props.userHistory);
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
                Some dope meal
              </div>
              <div className="review-event-date">
                Some arbitrary date
              </div>
            </div>
          </div>
          <form className="review-rating-container">
            <div className="review-rating" onClick={this.setRating}>
              <span value={1}>☆</span>
              <span value={2}>☆</span>
              <span value={3}>☆</span>
              <span value={4}>☆</span>
              <span value={5}>☆</span>
            </div>
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
  console.log('mStoP in UDReview:', state);
  return {
    userHistory: state.userHistory,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postUserReviewOfChef }, dispatch);
}

UserReview.propTypes = {
  postUserReviewOfChef: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReview);

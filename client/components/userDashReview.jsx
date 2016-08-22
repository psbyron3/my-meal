import React, { Component, PropTypes, ReactDOM } from 'react';
import { connect } from 'react-redux';
import { postUserReviewOfChef } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Col, Row, FormControl, textarea, Image } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

const userId = window.localStorage.userId;


class UserReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      rating: 1,
      eventId: this.props.index,
      reviewerId: this.props.userInfo.id,
      hostId: this.props.hostId,
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
  }

  onStarClick(nextValue, prevValue) {
    console.log(`next value is...${nextValue} and previous value was ${prevValue}`);
    this.setState({ rating: nextValue }, () => {
      console.log('this.state is....', this.state);
    });
  }

  render() {
    // console.log('UDReview userHistory', this.props.userHistory);
    const { rating } = this.state;
    return (
      <Row>
        <Col className="review-gutter" md={2} />
        <Col className="review-container" md={8}>
          <div className="review-event-basics">
            <div className="review-image-container">
              <Image
                className="review-image"
                src={this.props.eventPic}
                role="presentation"
              />
            </div>
            <div className="review-event-details">
              <div className="review-event-title">
                <h3>{this.props.eventName}</h3>
              </div>
              <div className="review-event-date">
                {moment(this.props.date).format("MMMM DD, YYYY hh:mm A")}
              </div>
            </div>
          </div>
          <form className="review-rating-container" >
            <div className="review-star-container">
              <StarRatingComponent
                className="review-stars"
                name={this.props.eventName}
                starCount={5}
                value={rating}
                onStarClick={this.onStarClick}
              />
            </div>
              <div className="review-comments">
                <textarea
                  placeholder="How was your experience?"
                  className="review-comment-textarea"
                  onChange={this.onCommentChange} 
                />
              </div>
              <div className="review-button-container">
                <button
                  type="submit"
                  onClick={this.onReviewSubmit}
                  className="btn btn-primary"
                >Submit Rating
                </button>
              </div>
          </form>
        </Col>
        <Col className="review-gutter" md={2} />
      </Row>

    );
  }
}


function mapStateToProps(state) {
  // console.log('mStoP in UDReview:', state.userHistory);

  return {
    userHistory: state.userHistory,
    Review: state.review,
    userInfo: state.userInfo,
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

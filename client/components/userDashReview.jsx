import React, { Component } from 'react';

import { Col, FormControl, textarea } from 'react-bootstrap';

export default class userReview extends Component {

  setRating = () => {

  }

  render() {
    return (
      <div>
        <Col className="review-gutter" md={2} />
        <Col className="review-container" md={8}>
          <div className="review-event-basics">
            <div className="review-event-image">
              <img
                src="../assets/stock-chef.jpg"
                role="presentation"
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
          <div className="review-rating-container">
            <div className="review-rating" onClick={this.setRating()}>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
              <span>☆</span>
            </div>
          </div>
          <div className="review-comments">
            <textarea />
          </div>
        </Col>
        <Col className="review-gutter" md={2} />
      </div>

    );
  }
}

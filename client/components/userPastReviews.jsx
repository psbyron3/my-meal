import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, FormControl, textarea, Image } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

const PastReview = ({ eventName, date, index, rating }) => {
  // return (const { rating } = this.state;
  return (
    <Row>
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
        <StarRatingComponent
          name={this.props.index}
          starCount={5}
          value={rating}
          editing={false}
        />
        <div className="review-comments">
          <textarea onChange={this.onCommentChange} />
        </div>
      </Col>
      <Col className="review-gutter" md={2} />
    </Row>

  );
};

export default PastReview;

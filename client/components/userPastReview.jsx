import React, { PropTypes } from 'react';
import { Col, Row, FormControl, textarea, Image } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

const PastReview = ({ eventName, date, index, rating, eventPic, content }) => {
  // return (const { rating } = this.state;
  return (
    <Row>
      <Col className="review-gutter" md={2} />
      <Col className="review-container" md={8}>
        <div className="review-event-basics">
          <div className="review-event-image">
            <Image
              src={eventPic}
              role="presentation"
            />
          </div>
          <div className="review-info">
            <div className="review-title-and-stars">
              <div className="review-event-details">
                <div className="review-event-title">
                  <h3>{eventName}</h3>
                </div>
                <div className="review-event-date">
                  {moment(date).format('MMMM DD, YYYY')}
                </div>
              </div>
              <div className="star-review">
                <StarRatingComponent
                  name={index}
                  starCount={5}
                  value={rating}
                  editing={false}
                />
              </div>
            </div>
            <div className="review-content">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </Col>
      <Col className="review-gutter" md={2} />
    </Row>

  );
};

PastReview.propTypes = {
  eventName: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  rating: PropTypes.number,
  eventPic: PropTypes.string,
  content: PropTypes.string,
};

export default PastReview;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
import { Grid, Col, Row, Image } from 'react-bootstrap';


class DashEvent extends Component {

  formatTime(time, str) {
    const formattedTime = time.split(',');
    const eventDate = formattedTime.splice(0, 1);
    const eventTime = formattedTime.join('');

    if (str === 'time') {
      return eventTime;
    }
    return eventDate;
  }

 // Interprets db location string and breaks into street and city, state.
  formatAddress(address, str) {
    const formattedAddress = address.split(',');
    const streetAddress = formattedAddress.splice(0, 1);
    const cityAddress = formattedAddress.join('');

    if (str === 'street') {
      return streetAddress;
    }
    return cityAddress;
  }

  render() {
    let startTime = moment(this.props.userHistory.startDatetime).format('MMMM Do YYYY, h:mm a');
    let endTime = moment(this.props.userHistory.endDatetime).format('MMMM Do YYYY, h:mm a');
    return (
      <div>
        <Col className="user-gutter" md={2} />
        <Col className="user-event-list" md={8}>
          <div className="user-event">
            <Row className="user-event-basics">
              <Image
                className="user-event-pic"
                src={this.props.image}
              />
              <div className="user-event-info">
                <div className="user-event-title">
                  {this.props.eventName}
                </div>
                <div className="user-event-street">
                  {this.formatAddress(this.props.address, 'street')}
                </div>
                <div className="user-event-location">
                  {this.formatAddress(this.props.address)}
                </div>
                <div className="user-event-date">
                  {this.props.times}
                  <div className="user-event-time">
                    
                  </div>
                </div>
                <div className="user-event-description">
                  {this.props.description}
                </div>
              </div>
            </Row>
            <Row className="user-chef-info">
              <div>
              </div>
              <Image
                className="user-chef-photo"
                src="../assets/stock-chef.jpg"
                circle
              />
              <div className="user-chat">
                <button className="btn btn-primary">Chat</button>
              </div>
            </Row>
          </div>
        </Col>
        <Col className="user-gutter" md={2} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('UDE mapStoP Events by User Id : ', state.userHistory);
  return {
    userHistory: state.userHistory,
  };
}

DashEvent.propTypes = {
  userHistory: PropTypes.object,
  image: PropTypes.string,
  eventName: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
};

export default connect(mapStateToProps)(DashEvent);

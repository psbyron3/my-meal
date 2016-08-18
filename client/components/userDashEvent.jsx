import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { EventIdFunc, ChatBoxFunc } from '../actions/index';

class DashEvent extends Component {

  onHandleClick(e, evName) {
    new Promise((resolve, reject) => {
      resolve(this.props.ChatBoxFunc('false'));
    }).then(() => {
      return this.props.EventIdFunc(e, evName);
    }).then(() => {
      return this.props.ChatBoxFunc('true');
    });
  }

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
    const startTime = moment(this.props.userHistory.startDatetime).format('MMMM Do YYYY, h:mm a');
    const endTime = moment(this.props.userHistory.endDatetime).format('MMMM Do YYYY, h:mm a');
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
                <button
                  className="btn btn-primary"
                  onClick={() => { this.onHandleClick(this.props.index, this.props.eventName); }}
                >Chat
                </button>
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
  // console.log('UD mapStoP Events by User Id : ', state.userHistory.data);
  // console.log(state.boxStatus.status, 'box STATUUUUUUUS');
  return {
    userHistory: state.userHistory,
  };
}

DashEvent.propTypes = {
  userHistory: PropTypes.array,
  image: PropTypes.string,
  eventName: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
  EventIdFunc: PropTypes.func,
  ChatBoxFunc: PropTypes.func,
  boxStatus: PropTypes.bool
};

export default connect(mapStateToProps, { EventIdFunc, ChatBoxFunc })(DashEvent);

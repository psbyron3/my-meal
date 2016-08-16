import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { EventIdFunc, ChatBoxFunc } from '../actions/index';
import MessageBox from './messageBox';

class DashEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  onHandleClick(e) {
    this.props.EventIdFunc(e);
    this.props.ChatBoxFunc('true');
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

  render() {
    let box = null;
    console.log(this.props.boxStatus, 'EEEEEEEEEEEND');
    if (this.props.boxStatus) {
      box = <MessageBox />;
    }


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
                <div className="user-event-location">
                  {this.props.address}
                </div>
                <div className="user-event-time">
                  {this.formatTime(startTime)},
                  {this.formatTime(startTime, 'time')} to
                  {this.formatTime(endTime, 'time')}
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
                <button className="btn btn-primary" onClick={() => { this.onHandleClick(this.props.index); }}>Chat
                </button>
              </div>
            </Row>
          </div>
        </Col>
        <Col className="user-gutter" md={2} />
        {box}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('UD mapStoP Events by User Id : ', state.userHistory.data);
  console.log(state.boxStatus.status, 'box STATUUUUUUUS');
  return {
    userHistory: state.userHistory,
    boxStatus: state.boxStatus.status,
  };
}

DashEvent.propTypes = {
  userHistory: PropTypes.array,
  image: PropTypes.string,
  eventName: PropTypes.string,
  address: PropTypes.string,
  description: PropTypes.string,
};

export default connect(mapStateToProps, { EventIdFunc, ChatBoxFunc })(DashEvent);

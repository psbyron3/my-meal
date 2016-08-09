import React, { Component } from 'react';

import { Grid, Col, Row, Image } from 'react-bootstrap';

export default class DashEvent extends Component {

  render() {
    return (
      <div>
        <Col className="user-gutter" md={2} />
        <Col className="user-event-list" md={8}>
          <div className="user-event">
          <Row className="user-event-basics">
            <Image 
              className="user-event-pic"
              src="../assets/bbq.jpg"
            />
            <div className="user-event-info">
              <div className="user-event-title">
                Title of event
              </div>
              <div className="user-event-location">
                Location
              </div>
              <div className="user-event-time">
                Time
              </div>
              <div className="user-event-description">
                This is a description of this dope-ass event!
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import { moment } from 'moment';

class JoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  handleJoinEvent() {
    // axios()
  }

  renderPic() {
    if (this.props.selectedEvent.eventPic) {
      return (<img src={this.props.selectedEvent.eventPic} alt={this.props.selectedEvent.eventName}/>);
    }
    return(<div></div>);
  }

  render() {
    let startTime = moment(this.props.selectedEvent.startDatetime).format('MMMM Do YYYY, h:mm');
    let endTime = moment(this.props.selectedEvent.endDatetime).format('h:mm');
    return (
      <Modal>
        <Modal.Header>
          <h1>{this.props.selectedEvent.eventName}</h1>
        </Modal.Header>
        <Modal.Body>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.renderPic()}
              </Col>
            </Row>
            <Row>
              <Col xs={9} sm={10}>
                <p>{this.props.selectedEvent.description}</p>
              </Col>
              <Col xs={3} sm={2}>
                <h3>${this.props.selectedEvent.price}</h3>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>{this.props.selectedEvent.address}</Col>
              <Col xs={12} md={4} mdOffset={2}>{startTime} - {endTime}</Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button>Confirm</Button>
          <Button onClick={this.props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { selectedEvent: state.selectedEvent };
}


export default connect(mapStateToProps)(JoinModal);

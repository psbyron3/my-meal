import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MapView } from './map.js';
import { MapList } from './maplist.js';
import { JoinModal } from './join-modal.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  close() {
    this.setState({
      showModal: false,
    });
  }

  open() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <MapView />
          </Col>
          <Col xs={12} md={4}>
            <MapList close={() => this.close} open={() => this.open} />
          </Col>
        </Row>
        <JoinModal close={() => this.close} open={() => this.open} />
      </Grid>
    );
  }
}

export default Home;

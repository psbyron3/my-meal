import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MapView from './map.js';
import MapList from './maplist.js';
import JoinModal from './join-modal.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <div>
        <MapView />
        <JoinModal />
      </div>
    );
  }
}

export default Home;
// <Grid>
//   <Row>
//     <Col xs={12} md={8}>
//       <MapView />
//     </Col>
//     <Col xs={12} md={4}>
//       <MapList />
//     </Col>
//     <JoinModal />
//   </Row>
// </Grid>

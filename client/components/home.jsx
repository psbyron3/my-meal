import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MapView from './map.js';
import MapList from './maplist.js';
import JoinModal from './join-modal.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
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
        <MapView openModal={this.open} />
        <div id="placeholder">MapList</div>
        <JoinModal showModal={this.state.showModal} closeModal={this.close} />
      </div>
    );
  }
}

export default Home;

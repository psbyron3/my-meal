import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MapView from './map.js';
import MapList from './maplist.js';
import JoinModal from './join-modal.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, hoverEvent: null };
    this.setHoverEvent = this.setHoverEvent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setHoverEvent(index) {
    this.setState({
      hoverEvent: index,
    });
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div>
        <MapView setHoverEvent={this.setHoverEvent} openModal={this.openModal} />
        <MapList hoverEvent={this.state.hoverEvent} />
        <JoinModal showModal={this.state.showModal} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default Home;

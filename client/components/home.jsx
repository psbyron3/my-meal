import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MapView from '../containers/map.jsx';
import MapList from '../containers/maplist.jsx';
import JoinModal from '../containers/join-modal.jsx';

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
        <MapList hoverEvent={this.state.hoverEvent} openModal={this.openModal} />
        <JoinModal showModal={this.state.showModal} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default Home;

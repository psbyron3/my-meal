import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MapView from '../containers/map';
import MapList from '../containers/maplist';
import JoinModal from '../containers/join-modal';
import ErrorAlert from './errorAlert';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      showModal: false,
      hoverEvent: 0,
    };

    this.setHoverEvent = this.setHoverEvent.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showAlert = this.showAlert.bind(this);
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

  showAlert() {
    this.setState({
      alert: true
    });
  }

  render() {
    return (
      <div>
        <MapView setHoverEvent={this.setHoverEvent} openModal={this.openModal} showAlert={this.showAlert} />
        <MapList hoverEvent={this.state.hoverEvent} openModal={this.openModal} />
        <JoinModal showModal={this.state.showModal} closeModal={this.closeModal} />
        <ErrorAlert alert={this.state.alert} />
      </div>
    );
  }
}

export default Home;

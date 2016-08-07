import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectEvent } from '../actions/index.js';
import { Cell } from 'fixed-data-table';
import { Card, CardTitle } from 'react-materialize';


class MapListEntry extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    // this.handleOut = this.handleOut.bind(this);
  }

  handleEnter(e) {
    e.preventDefault();
    const selectedEvent = this.props.allEvents.find((event) => {
      return event.id === this.props.index;
    });
    // action creator that sets current selection
    this.props.selectEvent(selectedEvent);
  }


  formatAddress(address, str) {
    const formattedAddress = address.split(',');
    const streetAddress = formattedAddress.splice(0, 1);
    const cityAddress = formattedAddress.join('');
    console.log('street: ', streetAddress);
    console.log('city: ', cityAddress);
    if (str === 'street') {
      return streetAddress;
    }
    return cityAddress;
  }

  render() {
    return (

      <div id="f1_container">
        <div
          id="f1_card"
          onClick={this.props.openModal}
          className={this.props.entryClass}
          key={this.props.key}
          index={this.props.index}
          onMouseEnter={this.handleEnter}
        >
          <div className="front face">
            <img
              src={this.props.image}
              className="list-image"
              role="presentation"
            />
            <div className="price-banner">
              <div className="event-price">
                $ {this.props.price}
              </div>
              <div className="chef-rating-container">
                <div className="chef-rating">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                </div>
              </div>
            </div>
          </div>
          <div className="back face center">
            <div className="event-name">
              <strong>{this.props.eventName}</strong>
            </div>
            <div className="street-address">
              {this.formatAddress(this.props.address, 'street')}
            </div>
            <div className="city-address">
              {this.formatAddress(this.props.address)}
            </div>
            <div className="event-start-to-end">
              {this.props.times}
            </div>
            <div className="event-description">
              {this.props.description}
            </div>
            <div className="event-maxGuests">
              Max Guests: {this.props.maxGuests}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allEvents: state.allEvents,
    selectedEvent: state.selectedEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MapListEntry);

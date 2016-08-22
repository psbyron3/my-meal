import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MapList from './maplist';
import MapMarker from './map-marker';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

const API_KEY = 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs';

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: null, lng: null },
      zoom: 13,
      currentMarker: null,
    };
    this.setCurrent = this.setCurrent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    return nextProps.allEvents.length > 0 ? this.props.setAlert(false) : this.props.setAlert(true);
  }

  setCurrent(index) {
    return this.setState({ currentMarker: index });
  }

  renderMarkers() {
    // console.log('allEvents in MapView:', this.props.allEvents);
    if (this.props.allEvents.length > 0) {
      return this.props.allEvents.map((event) => {
        return (
          <MapMarker
            index={event.id}
            key={event.id}
            lat={event.latitude}
            lng={event.longitude}
            eventName={event.eventName}
            address={event.address}
            startTime={event.startDatetime}
            endTime={event.endDatetime}
            openModal={this.props.openModal}
            setCurrent={this.setCurrent}
            currentMarker={this.state.currentMarker}
            setHoverEvent={this.props.setHoverEvent}
          />
        );
      });
    }
    return (<span></span>);
  }

  render() {
    // console.log('location in map: ', this.props);
    return (
      <div>Here is the map:
        <div className="map">
          <GoogleMap
            bootstrapURLKeys={{
              key: API_KEY,
              language: 'en',
            }}
            defaultZoom={this.state.zoom}
            center={this.props.location.latitude ?
              {
                lat: this.props.location.latitude,
                lng: this.props.location.longitude,
              }
              : this.state.center}
          >
            {this.renderMarkers()}
          </GoogleMap>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.map,
    allEvents: state.allEvents,
  };
}

MapView.propTypes = {
  allEvents: PropTypes.array,
  openModal: PropTypes.func,
  setHoverEvent: PropTypes.func,
  location: PropTypes.object,
  setAlert: PropTypes.func,
};

export default connect(mapStateToProps)(MapView);

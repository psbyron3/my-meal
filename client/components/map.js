import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import MapList from './maplist';
import MapMarker from './map-marker.jsx';
import { connect } from 'react-redux';
// import IceFixedTable from '../exampleTable/example_maplist'
// import shouldPureComponentUpdate from 'react-addons-shallow-compare';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';


const API_KEY = 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs';

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 34.0195, lng: -118.4912 },
      zoom: 13,
    };
  }


  renderMarkers() {
    console.log('allEvents:', this.props.allEvents);
    if (this.props.allEvents.length > 0) {
      return this.props.allEvents.map((event) => {
        console.log('for each event in allevents map: ', event);
        return (<MapMarker
          key={event.id}
          lat={event.latitude}
          lng={event.longitude}
          eventName={event.eventName}
          address={event.address}
          startTime={event.startDatetime}
          endTime={event.endDatetime}
          openModal={this.props.openModal}
        />);
      });
    }
    return (<div>BBBBB</div>);
  }

  render() {
    console.log('location in map: ', this.props.location);
    return (
      <div>Here is the map:
        <div className="text-xs-right">
          <Link to="/" className="btn btn-primary">Back</Link>
        </div>
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
  console.log('state to props :', state.map);
  return {
    location: state.map,
    allEvents: state.allEvents,
  };
}


export default connect(mapStateToProps)(MapView);

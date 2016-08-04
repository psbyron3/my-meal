import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import MapList from './maplist';
import { connect } from 'react-redux';
// import IceFixedTable from '../exampleTable/example_maplist'
// import shouldPureComponentUpdate from 'react-addons-shallow-compare';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';


const API_KEY = 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs';

const bounds = {
  nw: {
    lat: 50.01038826014866,
    lng: -118.6525866875,
  },
  se: {
    lat: 32.698335045970396,
    lng: -92.0217273125,
  },
};


class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 34.0195, lng: -118.4912 },
      zoom: 13,
    };
  }

  // const { center, zoom } = fitBounds(bounds, size);

  // const { center, zoom } = fitBounds(bounds, size);

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
            center={this.props.location.lat ?
              {
                lat: this.props.location.lat,
                lng: this.props.location.lng,
              }
              : this.state.center}
          />

        </div>

      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('state to props :', state.map);
  return { location: state.map };
}

export default connect(mapStateToProps)(MapView);
// shouldComponentUpdate = shouldPureComponentUpdate;

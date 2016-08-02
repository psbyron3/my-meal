import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
// import shouldPureComponentUpdate from 'react-addons-shallow-compare';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

const API_KEY = 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs';

const size = {
  width: 640,
  height: 640,
};

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


// const { center, zoom } = fitBounds(bounds, size);

// const { center, zoom } = fitBounds(bounds, size);



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: { lat: 34.0195, lng: -118.4912 },
      zoom: 13,
    };
  }

  // componentDidMount() {
  //   createMapOptions()
  // }

  // createMapOptions = function (maps) {
  //   return {

  //   };
  // }

  render() {
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
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          />
        </div>
      </div>
    );
  }
}

// shouldComponentUpdate = shouldPureComponentUpdate;


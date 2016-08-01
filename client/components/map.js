import React, { PropTypes, Component } from 'react';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

const API_KEY = 'AIzaSyDXLvbYh4moubEU_ChyobbXbC8b6EMSrKs';

const size = {
  width: '100%',
  height: '100%',
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


const { center, zoom } = fitBounds(bounds, size);


export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: { lat: 34.0195, lng: 118.4912 },
    zoom: 13,
  }

  constructor(props) {
    super(props);

    this.state = '';
  }


  // createMapOptions = function (maps) {
  //   return {

  //   };
  // }

  render() {
    return (
      <GoogleMap
        // options={createMapOptions}
        bootstrapURLKeys={{
          key: API_KEY,
          language: 'en',
        }}
        // defaultCenter={this.props.center}
        // defaultZoom={this.props.zoom}
      />
    );
  }

}

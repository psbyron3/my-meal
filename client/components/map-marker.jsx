import React, { Component } from 'react';
import Infowindow from './infowindow.jsx';
import { OverlayTrigger } from 'react-bootstrap';

const MapMarker = (props) => {

  const style = {
    position: 'absolute',
    left: -20,
    top: -20
  };
  const infowindow = (<Infowindow {...props}/>);

  return (
    <div style={style}>
      <OverlayTrigger trigger="click" placement="top" overlay={infowindow}>
        <img
          src="../assets/map-marker.png"
          style={{ width: '32px', height: '32px' }}
          role="presentation"
        />
      </OverlayTrigger>
    </div>
  )
}

export default MapMarker;

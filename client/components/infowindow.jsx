import React, { Component } from 'react';
import { Popover, Button } from 'react-bootstrap';


const Infowindow = ({ key, lat, lng, eventName, address, startTime, endTime, setSelectedEvent }) => {
  return (
    <div>
      <Button>A button</Button>
    </div>
  );
};

export default Infowindow;

// <Popover>
//   <h5>{eventName}</h5>
//   <h6>{address}</h6>
//   <h6>{startTime} - {endTime}</h6>
//   <Button onClick={setSelectedEvent}>Join</Button>
// </Popover>

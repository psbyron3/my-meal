import React, { PropTypes } from 'react';

const DistanceMenu = ({ onDistanceChange, distance }) => (
  <select onChange={onDistanceChange} value={distance}>
    <option value={0}>Select a radius</option>
    <option value={1}>1 miles</option>
    <option value={5}>5 miles</option>
    <option value={10}>10 miles</option>
    <option value={15}>15 miles</option>
    <option value={20}>20 miles</option>
    <option value={25}>25 miles</option>
  </select>
);

DistanceMenu.propTypes = {
  onDistanceChange: PropTypes.func,
  distance: PropTypes.number,
};

export default DistanceMenu;

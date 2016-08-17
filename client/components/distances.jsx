import React, { Component, PropTypes } from 'react';

const DistanceMenu = ({ onDistanceChange }) => {
  return (
    <select onChange={onDistanceChange}>
      <option disabled>Select a radius</option>
      <option value={1}>1 miles</option>
      <option value={5}>5 miles</option>
      <option value={10}>10 miles</option>
      <option value={15}>15 miles</option>
      <option value={20}>20 miles</option>
      <option value={25}>25 miles</option>
    </select>
  );
};

DistanceMenu.propTypes = {
  onDistanceChange: PropTypes.func,
};

export default DistanceMenu;

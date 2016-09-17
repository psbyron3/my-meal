import React, { PropTypes } from 'react';

const ErrorAlert = ({ alert }) => (
  <div className={`showAlert-${alert}`}>
    <div className="errorAlert">
      <h4>No events matched your search</h4>
      <p>Adjust your search options and try again.</p>
    </div>
  </div>
);

ErrorAlert.propTypes = {
  alert: PropTypes.bool,
};

export default ErrorAlert;

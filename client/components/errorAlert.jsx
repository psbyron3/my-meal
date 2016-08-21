import React, { Component } from 'react';

const ErrorAlert = ({message, alert}) => {
  return (
    <div className={`showAlert-${alert}`}>
      <div className="errorAlert">
        <h4>No events matched your search</h4>
        <p>Adjust your search options and try again.</p>
      </div>
    </div>
  )
}

export default ErrorAlert;

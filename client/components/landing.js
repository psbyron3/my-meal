import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Landing extends Component {

  render() {
    return (
      <div>On the Landing Page
        <div className="text-xs-right">
          <Link to="/home" className="btn btn-primary">Home</Link>
        </div>
      </div>

    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBar from './navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>
          {this.props.children}
        </div>
      </div>

    );
  }
}

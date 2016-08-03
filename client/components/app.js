import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBarComp from './navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBarComp />
        <div>
          {this.props.children}
        </div>
      </div>

    );
  }
}

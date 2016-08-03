import React, { Component } from 'react';
import { Link } from 'react-router';
import NavBarComp from './navbar';
import SearchBar from '../containers/searchBar'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBarComp> 
          <SearchBar />
        </NavBarComp>
        <div>
          {this.props.children}
        </div>
      </div>

    );
  }
}

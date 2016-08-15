import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavBarComp from './navbar';
import SearchBar from '../containers/searchBar';

export default class App extends Component {
  render() {
    console.log('typeof this.props.children......', typeof this.props.children);
    return (
      <div>
        <NavBarComp>
          <SearchBar />
        </NavBarComp>
        <div id="routeView">
          <div>
            {this.props.children}
          </div>
        </div>
      </div>

    );
  }
}

App.propTypes = { children: PropTypes.object };

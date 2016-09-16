import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NavBarComp from '../containers/navbar';
import SearchBar from '../containers/searchBar';


export default class App extends Component {
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
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

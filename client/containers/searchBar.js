import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };
  }

  render() {
    return (
      <div className="nav-search">
        <form>
          <input type="search" placeholder="Search" />
        </form>
      </div>

    );
  }

}

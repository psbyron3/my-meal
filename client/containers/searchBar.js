import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchLocations } from '../actions/index';
import { bindActionCreators } from 'redux';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log("inputChange: ", event.target.value);
    this.setState({ query: event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.searchLocations(this.state);
    console.log("state.query: ", this.state.query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <div className="nav-search">
        <form onSubmit={this.onFormSubmit} className='search-input'>
          <input
            className="form-control" 
            type="search" 
            placeholder="Search Location"
            value={this.state.query}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchLocations}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
import React, { Component } from 'react';
import { FormGroup, Popover } from 'react-bootstrap';
import connect from 'react-redux';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this.props.restrictions
  renderRestrictions() {
    return;
  }

  // this.props.genres
  renderGenres() {
    return;
  }

  render() {
    console.log(this.props);
    return (
      <div id="advancedSearch">
        <p>The advanced search goes here</p>
        <FormGroup>
          <p>Restrictions</p>
        </FormGroup>
        <FormGroup>
          <p>Cuisine Dropdown</p>
        </FormGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    restrictions: state.tags.restrictions,
    genres: state.tags.genres,
  };
}

export default connect(mapStateToProps)(AdvancedSearch);

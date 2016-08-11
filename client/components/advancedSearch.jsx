import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>The advanced search goes here</p>
        <FormGroup>
          Restrictions
        </FormGroup>
        <FormGroup>
          Cuisine Dropdown
        </FormGroup>
      </div>
    );
  }
}

export default AdvancedSearch;

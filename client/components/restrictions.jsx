import React, { Component } from 'react';

class RestrictionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderRestrictions = this.renderRestrictions.bind(this);
  }
  renderRestrictions() {
    return;
  }

  render() {
    console.log('...........', this.props);
    return(
      <div>restrictions</div>
    )
  }
}

export default RestrictionMenu;

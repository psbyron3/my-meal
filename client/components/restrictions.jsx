import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class RestrictionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRestrictions() {
    return this.props.restrictions.map((restriction) => {
      return (
        <div style={{ display: 'inline-block' }}>
          <label key={restriction.id} className="checkboxLabel">
            <input
              type="checkbox"
              value={restriction.id}
              checked={this.props.selectedRestrictions.indexOf(restriction.id) > -1}
              onFocus={this.props.onCheckChange}
            />
          {restriction.tagName}
          </label>
        </div>
      );
    });
  }

  render() {
    return (
      <div id="checkboxes">{this.renderRestrictions()}</div>
    );
  }
}

export default RestrictionMenu;

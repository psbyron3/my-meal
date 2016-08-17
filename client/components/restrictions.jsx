import React, { Component, PropTypes } from 'react';

class RestrictionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderRestrictions() {
    console.log('this.props.restrictions', this.props.restrictions);
    return this.props.restrictions.map((restriction) => {
      return (
        <div style={{ display: 'inline-block' }} key={restriction.id}>
          <label className="checkboxLabel">
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

RestrictionMenu.propTypes = {
  restrictions: PropTypes.array,
  selectedRestrictions: PropTypes.array,
  onCheckChange: PropTypes.func,
};

export default RestrictionMenu;

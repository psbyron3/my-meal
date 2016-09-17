import React, { PropTypes } from 'react';

const RestrictionMenu = ({ restrictions, selectedRestrictions, onCheckChange }) => {
  function renderRestrictions() {
    return restrictions.map(restriction => (
      <div style={{ display: 'inline-block' }} key={restriction.id}>
        <label className="checkboxLabel">
          <input
            type="checkbox"
            value={restriction.id}
            defaultChecked={selectedRestrictions.indexOf(restriction.id) > -1}
            onFocus={onCheckChange}
          />
        &nbsp;{restriction.tagName}
        </label>
      </div>
    ));
  }

  return (
    <div id="checkboxes">{renderRestrictions()}</div>
  );
};

RestrictionMenu.propTypes = {
  restrictions: PropTypes.array,
  selectedRestrictions: PropTypes.array,
  onCheckChange: PropTypes.func,
};

export default RestrictionMenu;

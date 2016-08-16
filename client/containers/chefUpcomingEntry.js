import React, { PropTypes } from 'react';

const ChefUpcomingEntry = (props) => {
  return (
    <div className="card-mc">
      {props.eventId}
      <br />
      {props.eventName}
      <br />
      <div>
        <button onClick={() => { props.clicked(props.eventId); }}> chat </button>
      </div>
    </div>
  );
};

ChefUpcomingEntry.propTypes = {
  eventId: PropTypes.number,
  eventName: PropTypes.string,
  clicked: PropTypes.func,
};

export default ChefUpcomingEntry;

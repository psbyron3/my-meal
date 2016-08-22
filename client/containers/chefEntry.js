import React, { PropTypes } from 'react';

const ChefPastEntry = (props) => {
  return (
    <div className="card-mc">
      <div className="chef-event-name">
        {props.eventName}
      </div>
      <br />
      <div className="chef-meal-image">
        <img
          src={props.image}
          role="presentation"
        />
      </div>
      <div className="chef-btn-container">
        <div>
          <button
            className="btn btn-primary"
            onClick={() => { props.clicked(props.eventId, props.eventName); }}
          > chat
          </button>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => { props.deleteEvent(props.eventId); }}
          > delete
          </button>
        </div>
      </div>
    </div>
  );
};

ChefPastEntry.propTypes = {
  eventId: PropTypes.number,
  eventName: PropTypes.string,
  clicked: PropTypes.func,
};

export default ChefPastEntry;

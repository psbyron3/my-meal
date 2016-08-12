import React from 'react';

const ChefPastEntry = (props) => {
  return (
    <div className="col-md-4">
      {props.eventId}
      <br />
      {props.eventName}
      <div>
        <button onClick={() => { props.clicked(props.eventId); }}> chat </button>
      </div>
    </div>
  );
};

export default ChefPastEntry;

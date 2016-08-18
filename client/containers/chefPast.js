import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { organizeChefPast } from '../utils/helper';
import { EventIdFunc, ChatBoxFunc, DeleteEvent } from '../actions/index';
import ChefPastEntry from './chefEntry';

const _ = require('lodash');

class ChefPast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onHandleClick = this.onHandleClick.bind(this);
  }

  onHandleClick(e, evName) {
    new Promise((resolve, reject) => {
      resolve(this.props.ChatBoxFunc('false'));
    }).then(() => {
      return this.props.EventIdFunc(e, evName);
    }).then(() => {
      return this.props.ChatBoxFunc('true');
    });
  }

  renderList() {
    console.log('CHEF PAST:::::: ', this.props);
    if (!this.props.chefPastEvents.length) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefPastEvents.map((pastEvent) => {
      return (
        <ChefPastEntry
          eventName={pastEvent.eventName}
          eventId={pastEvent.id}
          deleteEvent={this.props.DeleteEvent}
          clicked={this.onHandleClick}
        />
      );
    });
  }

  //   return (
  //     <div>
  //       <div className="card-mc">
  //         {this.props.chefPastEvents[0].id}
  //         <br />
  //         {this.props.chefPastEvents[0].eventName}
  //         <div>
  //           <button onClick={() => { this.clicked('HELLOOO 1'); }}> chat </button>
  //         </div>
  //       </div>

  //       <div className="card-mc">
  //         {this.props.chefPastEvents[0].id}
  //         <br />
  //         {this.props.chefPastEvents[0].eventName}
  //         <div>
  //           <button onClick={() => { this.clicked('HELLOOO 2'); }}> chat </button>
  //         </div>
  //       </div>

  //       <div className="card-mc">
  //         {this.props.chefPastEvents[0].id}
  //         <br />
  //         {this.props.chefPastEvents[0].eventName}
  //         <div>
  //           <button onClick={() => { this.clicked('HELLOOO 3'); }}> chat </button>
  //         </div>
  //       </div>

  //       <div className="card-mc">
  //         {this.props.chefPastEvents[0].id}
  //         <br />
  //         {this.props.chefPastEvents[0].eventName}
  //         <div>
  //           <button onClick={() => { this.clicked('HELLOOO 2'); }}> chat </button>
  //         </div>
  //       </div>

  //       <div className="card-mc">
  //         {this.props.chefPastEvents[0].id}
  //         <br />
  //         {this.props.chefPastEvents[0].eventName}
  //         <div>
  //           <button onClick={() => { this.clicked('HELLOOO 3'); }}> chat </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefPastEvents: organizeChefPast(state.chefEvents.allChefEvents),
  };
}

ChefPast.propTypes = {
  chefPastEvents: PropTypes.array,
};

export default connect(mapStateToProps, { EventIdFunc, ChatBoxFunc, DeleteEvent })(ChefPast);

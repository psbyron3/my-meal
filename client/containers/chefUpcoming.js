import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefUpcomingEntry from './chefUpcomingEntry';
import { ChefUpcomingFunc } from '../actions/index';

class ChefUpcoming extends Component {

  componentDidMount() {
    this.props.ChefUpcomingFunc();
  }

  renderList() {
    console.log('PROOOOOOOOPS: ', this.props);
    if (this.props.chefUpcomingEvents === undefined) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefUpcomingEvents.map((upcomingEvent) => {
      return (
        <div>
          <div>
            <button> chat </button>
          </div>
          {upcomingEvent.id}
          <br />
          {upcomingEvent.eventName}
        </div>
      );
    });
  }

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
    chefUpcomingEvents: state.chefEvents.chefUpcomingEvents,
  };
}

export default connect(mapStateToProps, { ChefUpcomingFunc })(ChefUpcoming);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefPastEntry from './chefPastEntry';
import { ChefPastFunc } from '../actions/index';

class ChefPast extends Component {

  // this.props.ChefPastFunc();

  renderList() {
    console.log("PROOOOOOOOPS: ", this.props);
    return this.props.chefPastEvents.map((pastEvent) => {
      return (
        <div>
          {pastEvent.id}
          {pastEvent.eventName}
        </div>
      );
    });
  }
  


  render() {
    return (
      <div>
        hello
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefPastEvents: state.chefEvents
  };
};

export default connect(mapStateToProps, { ChefPastFunc })(ChefPast);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefPastEntry from './chefPastEntry';
import { ChefPastFunc } from '../actions/index';

class ChefPast extends Component {

  componentDidMount() {
    this.props.ChefPastFunc();
  }

  renderList() {
    console.log('PROOOOOOOOPS: ', this.props);
    if (this.props.chefPastEvents === undefined) {
      return (
        <div>
        </div>
      );
    }
    return this.props.chefPastEvents.map((pastEvent) => {
      return (
        <div>
          <div>
            <button> chat </button>
          </div>
          {pastEvent.id}
          <br />
          {pastEvent.eventName}
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
    chefPastEvents: state.chefEvents.chefPastEvents,
  };
}

export default connect(mapStateToProps, { ChefPastFunc })(ChefPast);

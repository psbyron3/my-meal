import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChefInfo extends Component {
  render() {
    return (
      <div>
        hello?
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefEvents: state.chefEvents.allChefEvents,
  };
}

export default connect(mapStateToProps)(ChefInfo);

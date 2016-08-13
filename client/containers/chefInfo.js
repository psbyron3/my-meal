import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reviewAverage } from '../utils/helper';

const _ = require('lodash');

class ChefInfo extends Component {


  render() {
    let chefRatingArray = [];

    _.each(this.props.chefEvents, (event) => {
      if(typeof event.rating === 'number') {
        chefRatingArray.push(event.rating);
      }
    })

    let chefRating = reviewAverage(chefRatingArray);

    return (
      <div>
        chef rating: {chefRating}
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

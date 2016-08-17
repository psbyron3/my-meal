import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { reviewAverage } from '../utils/helper';

const _ = require('lodash');

class ChefInfo extends Component {


  render() {
    const chefRatingArray = [];
    console.log('USERINFO HERE????? ', this.props.userInfo);
    _.each(this.props.chefEvents, (event) => {
      if (typeof event.rating === 'number') {
        chefRatingArray.push(event.rating);
      }
    });

    let chefRating;

    if (chefRatingArray.length) {
      chefRating = Math.round(reviewAverage(chefRatingArray) * 10) / 10;
    } else {
      chefRating = 'n/a';
    }

    let name = `${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`;

    return (
      <div className="chef-mc">
        <img src={this.props.userInfo.userPic} alt="userpic" width="128" />
        <br />
        <span className="text-capitalize">name: {name}</span>
        <br />
        <span>email: {this.props.userInfo.email}</span>
        <br />
        <span>chef rating: {chefRating}</span>
        <br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chefEvents: state.chefEvents.allChefEvents,
    userInfo: state.userInfo,
  };
}

ChefInfo.propTypes = {
  chefEvents: PropTypes.array,
};

export default connect(mapStateToProps)(ChefInfo);

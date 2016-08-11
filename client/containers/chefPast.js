import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefPastEntry from './chefPastEntry';
import { ChefPastFunc } from '../actions/index';

export default class ChefPast extends Component {

  // renderList() {
  //   return this.props.chefPast.map((pastEvent) => {
  //     return (
  //       <div>
  //         <ChefPastEntry />
  //       </div>
  //     );
  //   });
  // }
  //
  //
  //
  // {this.renderList()}

  Clicked() {
    ChefPastFunc();
  }

  render() {
    return (
      <div>
        <button onCLick={this.Clicked()}>CHEFPASTFUNC</button>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     chefPast: state.chefPast
//   };
// };
//
// export default connect(mapStateToProps)(ChefPast);

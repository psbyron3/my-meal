import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChefPastEntry from './chefPastEntry';

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

  render() {
    return (
      <div>
        CHEFPAST
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

import React, { Component } from 'react';
import { connect } from 'react-redux';

<<<<<<< 7362d78a14fa7016ad07e57c774385373952956c
// let authCheck = JSON.parse(localStorage["reduxPersist:auth"])
// console.log("AUTHCHECKER: ", authCheck);
=======
const authCheck = JSON.parse(localStorage['reduxPersist:auth']);
console.log('AUTHCHECKER: ', authCheck);
>>>>>>> [feature] allow sign in persistence on refresh

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    }

<<<<<<< 7362d78a14fa7016ad07e57c774385373952956c
    componentDidMount() {
      if (!this.props.authenticated) {
=======
    componentWillMount() {
      if (!this.props.authenticated && !authCheck.authenticated) {
>>>>>>> [feature] allow sign in persistence on refresh
        this.context.router.push('/');
      }
    }

<<<<<<< 7362d78a14fa7016ad07e57c774385373952956c
    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
=======
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated && !authCheck.authenticated) {
>>>>>>> [feature] allow sign in persistence on refresh
        this.context.router.push('/');
      }
    }

    // componentWillMount() {
    //   if (!this.props.authenticated) {
    //     this.context.router.push('/');
    //   }
    // }

    // componentWillUpdate(nextProps) {
    //   if (!nextProps.authenticated) {
    //     this.context.router.push('/');
    //   }
    // }

    render() {
<<<<<<< 7362d78a14fa7016ad07e57c774385373952956c
      // console.log("CHECKHERERRR: ", !authCheck.authenticated)
      // console.log("WHAT IS AUTH?? ", this.props.authenticated)
      // console.log("NEXTTTTT ", nextProps.authenticated)
=======
      console.log('CHECKHERERRR: ', !authCheck.authenticated);
>>>>>>> [feature] allow sign in persistence on refresh
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

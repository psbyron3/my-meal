import React, { Component } from 'react';
import { connect } from 'react-redux';

// let authCheck = JSON.parse(localStorage["reduxPersist:auth"])
// console.log("AUTHCHECKER: ", authCheck);

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentDidMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.authenticated) {
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
      // console.log("CHECKHERERRR: ", !authCheck.authenticated)
      // console.log("WHAT IS AUTH?? ", this.props.authenticated)
      // console.log("NEXTTTTT ", nextProps.authenticated)
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

import React, { Component } from 'react';
import { connect } from 'react-redux';

const authCheck = JSON.parse(localStorage['reduxPersist:auth']);
console.log('AUTHCHECKER: ', authCheck);

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object,
    }

    componentWillMount() {
      if (!this.props.authenticated && !authCheck.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated && !authCheck.authenticated) {
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
      console.log('CHECKHERERRR: ', !authCheck.authenticated);
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

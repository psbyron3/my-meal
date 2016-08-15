import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
  };

  return connect(mapStateToProps)(Authentication);
}

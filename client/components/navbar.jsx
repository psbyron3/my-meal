import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SearchBar from '../containers/searchBar';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { SignOutFunc } from '../actions/index';
import { connect } from 'react-redux';


class NavBarComp extends Component {

  showSearchBox() {
    if (this.props.showSearch) {
      return (
        <li> <SearchBar /> </li>
      );
    }
    return null;
  }

  authRender() {
    console.log('typeof authenticated == = = = ', typeof this.props.authenticated);
    if (!this.props.authenticated) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="signIn">Log In</a></li>
          <li><a href="signUp">Sign Up</a></li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <span className="glyphicon glyphicon-user"></span>
            <strong>{this.props.userInfo.userName}</strong>
            <span className="glyphicon glyphicon-chevron-down"></span>
          </a>

          <ul className="dropdown-menu">
            <li>
              <div className="navbar-login">
                <div className="row">
                  <div className="col-lg-8">
                    <p className="text-center">
                      <span className="glyphicon glyphicon-user icon-size"></span>
                    </p>
                  </div>
                  <div className="col-lg-8">
                    <p className="text-left">
                      <strong>
                        {this.props.userInfo.firstName} {this.props.userInfo.lastName}
                      </strong>
                    </p>
                    <p className="text-left small">{this.props.userInfo.email}</p>
                  </div>
                </div>
              </div>
            </li>

            <li className="divider"></li>

            <li>
              <div className="navbar-login">
                <div className="row">
                  <div className="col-lg-4">
                    <Link to="userdash"><p className="text-center"><strong>Foodie User</strong></p></Link>
                    <Link to="chefdash"><p className="text-center"><strong>Gourmet Chef</strong></p></Link>
                  </div>
                </div>
              </div>
            </li>

            <li className="divider"></li>

            <li>
              <div className="navbar-login navbar-login-session">
                <div className="row">
                  <div className="col-lg-12">
                    <p>
                      <a
                        href="#"
                        onClick={() => { this.props.SignOutFunc(); }}
                        className="btn btn-danger btn-block"
                      >Log out
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/">
              <img src="../assets/share-eat.png" role="presentation" />
            </Link>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
             {this.showSearchBox()}
            </ul>

            {this.authRender()}

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.userInfo,
    showSearch: state.showSearch.status,
  };
};

NavBarComp.propTypes = {
  authenticated: PropTypes.bool,
  SignOutFunc: PropTypes.func,
  showSearch: PropTypes.bool,
};

export default connect(mapStateToProps, { SignOutFunc })(NavBarComp);

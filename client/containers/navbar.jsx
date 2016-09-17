import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SearchBar from '../containers/searchBar';
import { SignOutFunc } from '../actions/index';
import { connect } from 'react-redux';


class NavBarComp extends Component {

  showSearchBox() {
    if (this.props.showSearch) {
      return (
        <SearchBar />
      );
    }
    return null;
  }

  authRender() {
    if (!this.props.authenticated) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="signIn">
              <div className="authButton"><h5>Log In</h5></div>
            </Link>
          </li>
          <li>
            <Link to="signUp">
              <div className="authButton"><h5>Sign Up</h5></div>
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <img
              src={this.props.userInfo.userPic}
              role="presentation"
              className="img-circle"
              style={{ width: '60px',
                height: '60px',
                display: 'inline-block',
                marginRight: '6px' }}
            />
            <strong >{this.props.userInfo.userName}</strong>
          </a>

          <ul className="dropdown-menu">
            <li>
              <div className="navbar-login">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="text-center">
                      <strong>
                        {this.props.userInfo.firstName} {this.props.userInfo.lastName}
                      </strong>
                    </p>
                    <p className="text-center small">{this.props.userInfo.email}</p>
                    <Link to="addevent">
                      <p className="col-lg-8 col-lg-offset-2 text-center">
                        <a href="#" className="btn btn-primary btn-block btn-sm">Host an event</a>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li className="divider"></li>

            <li>
              <div className="navbar-login">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="text-center"><strong><Link to="userdash">Foodie User</Link></strong></p>
                    <p className="text-center"><strong><Link to="chefdash">Gourmet Chef</Link></strong></p>
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
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <div className="header-logo">
              <Link to="/">
                <img src="../assets/share-eat.png" role="presentation" />
              </Link>
            </div>
            {this.showSearchBox()}
          </div>


          <div className="collapse navbar-collapse">
            {this.authRender()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    authenticated: state.auth.authenticated,
    userInfo: state.userInfo,
    showSearch: state.showSearch.status,
  }
);

NavBarComp.propTypes = {
  authenticated: PropTypes.bool,
  SignOutFunc: PropTypes.func,
  showSearch: PropTypes.bool,
  userInfo: PropTypes.object,
};

export default connect(mapStateToProps, { SignOutFunc })(NavBarComp);

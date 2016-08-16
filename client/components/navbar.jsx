import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SearchBar from '../containers/searchBar';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { SignOutFunc } from '../actions/index';
import { connect } from 'react-redux';


class NavBarComp extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  authRender() {
    console.log('typeof authenticated == = = = ', typeof this.props.authenticated);
    if (!this.props.authenticated) {
      return (
        <Nav pullRight>
          <NavItem className="sign-up">
            <Link to="signup">
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </Link>
          </NavItem>
          <NavItem className="sign-in">
            <Link to="signin">
              <button className="btn btn-primary btn-sm">Sign In</button>
            </Link>
          </NavItem>
        </Nav>
      );
    }
    return (
      <Nav pullRight>
        <NavItem className="add-event">
          <Link to="addevent">
            <button className="btn btn-primary btn-sm">Host Event</button>
          </Link>
        </NavItem>
        <NavItem className="user-dash">

          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"
            >
              Dashboard <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              <Link to="userdash">
                <li><a href="#">Foodie user</a></li>
              </Link>
              <Link to="chefdash">
                <li><a href="#">Gourmet Chief</a></li>
              </Link>
            </ul>
          </div>

        </NavItem>
        <NavItem>
          <button onClick={() => { this.props.SignOutFunc(); }} className="btn btn-primary btn-sm">
            log out
          </button>
        </NavItem>
      </Nav>
    );
  }

  render() {
    return (
      <Navbar fixedTop fluid className="navbar">
        <Navbar.Header className="nav-logo">
          <Navbar.Brand>
            <Link to="/">
              <img
                src="../assets/share-eat.png"
                role="presentation"
              />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullLeft>
          <NavItem>
            <SearchBar />
          </NavItem>
        </Nav>

{this.authRender()}

      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

NavBarComp.propTypes = {
  authenticated: PropTypes.bool,
  SignOutFunc: PropTypes.func,
};

export default connect(mapStateToProps, { SignOutFunc })(NavBarComp);

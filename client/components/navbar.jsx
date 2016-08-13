import React, { Component } from 'react';
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
          <Link to="dashboard">
            <button className="btn btn-primary btn-sm">Dashboard</button>
          </Link>
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

export default connect(mapStateToProps, { SignOutFunc })(NavBarComp);


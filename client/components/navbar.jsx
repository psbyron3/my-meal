import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchBar from '../containers/searchBar';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default class NavBarComp extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  render() {
    return (
      <Navbar fixedTop className="navbar">
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
        <Nav pullRight>
          <NavItem className="add-event">
            <Link to="addevent">
              <button className="btn btn-primary">Host Event</button>
            </Link>
          </NavItem>
          <NavItem className="sign-up">
            <Link to="signup">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </NavItem>
          <NavItem className="sign-in">
            <Link to="signin">
              <button className="btn btn-primary">Sign In</button>
            </Link>
          </NavItem>
          <NavItem className="user-dash">
            <Link to="dashboard">
              <button className="btn btn-primary">Dashboard</button>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

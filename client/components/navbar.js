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
      <Navbar fixedTop inverse>
        <Navbar.Header className="nav-logo">
          <Navbar.Brand>
            <Link to="/">Food Now!</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <SearchBar />
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem className="sign-up">
            <button className="btn btn-primary">Sign Up</button>
          </NavItem>
          <NavItem className="sign-in">
            <button className="btn btn-primary">Sign In</button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

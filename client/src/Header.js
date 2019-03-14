import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><NavLink exact to="/">Eventonica</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link> */}
            <Nav.Link><NavLink to="/events">Events</NavLink></Nav.Link>
            {/* <Nav.Link><NavLink to="/events/form">Create New Events</NavLink></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header;
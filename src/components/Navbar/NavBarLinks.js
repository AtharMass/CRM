import Nav from 'react-bootstrap/Nav'
import React from 'react';
import './styles/navbarlinks.css';
function NavBarLinks() {
    return (
        <Nav className="me-auto navbar-nav-style">
              <Nav.Item><Nav.Link key="0"  className="navbar-links" href="/clients"> Clients </Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link key="1"  className="navbar-links" href="/actions"> Actions </Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link key="2"  className="navbar-links" href="/analytics"> Analytics </Nav.Link></Nav.Item>
        </Nav>
    );
  }
  
  export default NavBarLinks;
  
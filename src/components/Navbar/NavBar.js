import React from 'react';
import NavBarLinks from './NavBarLinks'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../images/logo.png'
import './styles/navbar.css';

function NavBar() {
    return (
        <Navbar collapseOnSelect className="navbar-style">
            <Navbar.Brand href="#">
            <img
                src={logo}
                className="d-inline-block align-top logo"
                alt="CRM logo"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <NavBarLinks/>
            </Navbar.Collapse>
      </Navbar>
        
    )
  }
  
  export default NavBar;
  
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from "../../assets/images/logo-white.png";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <Nav.Link as={Link} to="/">
                <img src={logo} alt="logo" className='w-25 h-25 ms-5'/>
                </Nav.Link>
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navmenu">
                <Nav.Link as={Link} to="/">
                Home
                </Nav.Link>
                <Nav.Link as={Link} to="/shop">
                Shop
                </Nav.Link>
                <Nav.Link as={Link} to="/cart">
                Cart
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                Register
                </Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  )
}

export default Header
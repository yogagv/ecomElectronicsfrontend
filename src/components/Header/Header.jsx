import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import logo from "../../assets/images/logo-white.png";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import './header.css'
import { AuthContext } from '../Context/AuthContext';


const Header = () => {

  const {user, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {

        dispatch({ type: "LOGOUT"});
        navigate("/")
  
  }
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary nav" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'}}>
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
                {user ? (
                  <>
                   <p className='mt-2 ms-2 fw-medium text-secondary'>{user.name}</p>
                  <Nav.Link onClick={logout} id='logout'>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                <Nav.Link as={Link} to="/register" id='register'>
                <FaUser />
                </Nav.Link>
                  </>
                )}
                <Nav.Link as={Link} to="/cart">
                <FaShoppingCart />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
  )
}

export default Header
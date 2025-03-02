import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import "./header.css";
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handlelogout =()=>{
    localStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <>
      <Navbar bg={token ? "primary" :"dark"} variant='dark'>
        <Container>
          <Navbar.Brand><strong>{token ? "Logged-In" : "Not-LoggedIn"}</strong></Navbar.Brand>
          <Nav className="ml-auto">
             {token ? ( 
              <><Nav.Link as={Link} to="/dashboard"  className='nav-link'>dashboard</Nav.Link>
            <Nav.Link className='nav-link' onClick={handlelogout}>Log-out</Nav.Link></>
            ):<><Nav.Link as={Link} to="/login"  className='nav-link'>Login</Nav.Link>
            <Nav.Link as={Link} to="/register"  className='nav-link'>Sign up</Nav.Link></>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header

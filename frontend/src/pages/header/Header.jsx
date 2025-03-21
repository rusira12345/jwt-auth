import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import "./header.css";
import Freshfare from "./images/FRESHFARE.png"
import icon from "./images/pic1.png"
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const lock = localStorage.getItem("lock");
  const handlelogout =()=>{
    localStorage.removeItem("token");
    navigate('/');
  }
  return (
    <>
      <Navbar bg={token && !lock ? "primary" :"dark"} variant='dark'>
        <Container>
         
          
          <Navbar.Brand><strong>{token && !lock ?  <>
                  <img src={icon} alt="Icon" />
                  <span className='icon'>FRESHFARE</span>
                </> : "Not-LoggedIn"}</strong></Navbar.Brand>
          <Nav className="ml-auto">
             {token && !lock ? ( 
            <Nav.Link className='nav-link' onClick={handlelogout}>Log-out</Nav.Link>
            ):<Nav.Link as={Link} to="/"  className='nav-link'>Login</Nav.Link>
            
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header

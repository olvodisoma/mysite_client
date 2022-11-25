import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

export const MyNavBar=({loggedInUser,setLoggedInUser})=> {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="sm" dark color='dark' fixed='top'>
        <NavbarBrand href="/">🚀</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink to='/' className="nav-link active" aria-current="page">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='about' className="nav-link">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='contact' className="nav-link">Contact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='products' className="nav-link">Products</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>

            {loggedInUser ?
            (
            <Nav navbar>
            <NavItem className="nav-link d-flex align-items-center">
              <img src="hacker.png" alt="Avatar" style={{width:"30px",marginRight:"5px"}} />
              <span style={{cursor:"pointer"}}>{loggedInUser}</span>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <span className='btn text-info ' onClick={()=>setLoggedInUser('')}>Logout</span>
          </NavItem>
            </Nav>
            )
            :
            (
            <Nav navbar>
            <NavItem>
            <NavLink to="login" className="nav-link">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="register" className="nav-link">Register</NavLink>
          </NavItem>
            </Nav>)
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

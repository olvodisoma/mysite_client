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
            {loggedInUser?.role=='admin' && 
            (
              <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin Panel
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Users</DropdownItem>
                <DropdownItem>Products</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                <NavItem>
                  <NavLink to='books'>Books</NavLink>
                </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )
            }

            </Nav>

            {loggedInUser ?.username?
            (
            <Nav navbar>
            <NavItem className="nav-link d-flex align-items-center">
              <NavLink to="userProfile" className="nav-link">
              <img src={loggedInUser.avatar} alt="Avatar" style={{width:"20px",marginRight:"10px"}} />
              <span style={{cursor:"pointer"}}>{loggedInUser.username}</span>
              </NavLink>
          </NavItem>
          <NavItem className='d-flex align-items-center'>
            <NavLink to="/">
            <span className='btn text-info' onClick={()=>setLoggedInUser({})}>Logout</span>
            </NavLink>
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

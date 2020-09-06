import React, { Component, useState } from "react";
import "../App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

class NavbarTop extends Component {
    render(){
        return(
            <div>
                
                <Navbar fixed="top" expand="lg" color="light" light expand="md">
                    
                    <Nav className="m-auto" navbar>
                    <NavItem>
                        <NavLink href="/eportfolio">Portfolio</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/blog">Blog</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/store">Store</NavLink>
                    </NavItem>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            About
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem href="/aboutme">
                                Me
                            </DropdownItem>
                            <DropdownItem href="/aboutruntimeterror">
                                Runtime Terror
                            </DropdownItem>
                            <DropdownItem href="/contactme">
                                Contact Me
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    </Nav>

                </Navbar>
            </div>
        );
        
    };

}

export default NavbarTop;
import React, { Component } from "react";
import {
  DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar,
  NavbarBrand,

  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import "../App.css";

class NavbarTop extends Component {
  render() {
    return (
      <div>
        <Navbar
          className={`josefinFont header`}
          style={{ fontSize: "1.8rem", height: "55px" }}
          fixed="top"
          color="light"
          light
          expand="md"
        >
          <NavbarBrand className="navbarBand" style={{fontSize:"1.8rem"}}>Runtime Terror</NavbarBrand>

          <Nav className="m-auto" navbar>
            <NavItem>
              <NavLink
                style={{ marginRight: "20px", color: "#5f543f" }}
                href="/"
              >
                Portfolio
              </NavLink>
            </NavItem>
            &nbsp;
            <NavItem>
              <NavLink
                style={{ marginRight: "20px", color: "#5f543f" }}
                href="/blog"
              >
                Blog
              </NavLink>
            </NavItem>
            &nbsp;
            <NavItem>
              <NavLink
                style={{ marginRight: "20px", color: "#5f543f" }}
                href="/store-frontend"
              >
                Store
              </NavLink>
            </NavItem>
            &nbsp;
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "#5f543f" }}>
                About
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/aboutme">Me</DropdownItem>
                <DropdownItem href="/aboutruntimeterror">
                  Runtime Terror
                </DropdownItem>
                <DropdownItem href="/contactme">Contact Me</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavbarTop;

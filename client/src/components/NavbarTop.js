import React, { Component, useState } from "react";
import "../App.css";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class NavbarTop extends Component {
  render() {
    return (
      <div>
        <Navbar
          className="josefinFont"
          style={{ fontSize: "1.8rem", height: "55px" }}
          className="header"
          fixed="top"
          expand="lg"
          color="light"
          light
          expand="md"
        >
          <NavbarBrand className="navbarBand">Runtime Terror</NavbarBrand>

          <Nav className="m-auto" navbar>
            <NavItem>
              <NavLink style={{ marginRight: "20px" }} href="/">
                Portfolio
              </NavLink>
            </NavItem>
            &nbsp;
            <NavItem>
              <NavLink style={{ marginRight: "20px" }} href="/blog">
                Blog
              </NavLink>
            </NavItem>
            &nbsp;
            <NavItem>
              <NavLink style={{ marginRight: "20px" }} href="/store-frontend">
                Store
              </NavLink>
            </NavItem>
            &nbsp;
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
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

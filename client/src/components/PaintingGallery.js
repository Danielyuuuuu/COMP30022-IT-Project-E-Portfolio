import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

import { useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

const PaintNavBar = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <br />
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "25px 400px 15px 400px",
        }}
      >
        Painting
      </h1>

      <p style={{ margin: "30px 400px 10px 400px" }}>
        Painters apply products like paint, wallpaper, and other finishes on
        walls located both indoors and outdoors. Painter tasks include
        discussing job requirements with clients, preparing the job site,
        applying pre-coating agents, leveling surfaces, removing old paint,
        matching colors, filling holes, and cleaning tools.
      </p>

      <br />
      <Nav
        tabs
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavItem>
          <NavLink href="/paintinggallery">ALL</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Oil painting</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Sand painting</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Pencil Sketch</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/paintinggallery">Digital painting</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

class PaintingGallery extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaintNavBar />
        </div>
      </div>
    );
  }
}

export default PaintingGallery;

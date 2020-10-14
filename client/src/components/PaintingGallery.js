import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

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
        <h1>PaintingGallery</h1>
      </div>
    );
  }
}

export default PaintingGallery;

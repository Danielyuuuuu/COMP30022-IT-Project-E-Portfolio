import React, { Component } from "react";
import "../App.css";
import AboutMeContent from "./AboutMeContent";
import Footer from "./Footer";
import NavbarTop from "./NavbarTop";

class AboutMe extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <AboutMeContent />
        <Footer />
      </div>
    );
  }
}

export default AboutMe;

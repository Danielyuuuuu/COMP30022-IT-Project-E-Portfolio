import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import AboutMeContent from "./AboutMeContent";

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

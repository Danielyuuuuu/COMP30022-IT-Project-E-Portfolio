import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import ContactMeForm from "./ContactMeForm";
import Footer from "./Footer";

class ContactMe extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <h5>This is the "Contact Me" page.</h5>
        <ContactMeForm />
        <Footer />
      </div>
    );
  }
}

export default ContactMe;

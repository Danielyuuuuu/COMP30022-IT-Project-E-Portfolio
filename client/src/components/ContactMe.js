import React, { Component } from "react";
import "../App.css";
import ContactMeForm from "./ContactMeForm";
import Footer from "./Footer";
import NavbarTop from "./NavbarTop";

class ContactMe extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <ContactMeForm />
        <Footer />
      </div>
    );
  }
}

export default ContactMe;

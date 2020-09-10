import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import ContactMeForm from "./ContactMeForm";
import Footer from "./Footer";
import ContactMeInfo from "./ContactMeInfo";

class ContactMe extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <ContactMeInfo />
        <ContactMeForm />
        <Footer />
      </div>
    );
  }
}

export default ContactMe;

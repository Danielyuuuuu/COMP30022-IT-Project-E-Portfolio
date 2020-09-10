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
        <div className="contactInfo">
          <h1>Contact</h1>
          <h2>info@mysite.com</h2>
          <h2>Tel: 123-456-7890</h2>
        </div>
        <ContactMeForm />
        <Footer />
      </div>
    );
  }
}

export default ContactMe;

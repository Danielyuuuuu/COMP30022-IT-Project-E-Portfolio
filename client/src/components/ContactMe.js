import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class ContactMe extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <h5>This is the "Contact Me" page.</h5>
            </div>
        );
    }
}

export default ContactMe;
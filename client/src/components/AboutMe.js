import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class AboutMe extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <h5>This is the About Me.</h5>
            </div>
        );
    }
}

export default AboutMe;
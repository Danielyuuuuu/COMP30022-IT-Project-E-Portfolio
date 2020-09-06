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
                <h1>This is the About Me.</h1>
            </div>
        );
    }
}

export default AboutMe;
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class AboutRuntimeTerror extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <h5>This is the About Runtime Terror.</h5>
                <p>We can put our reports here.</p>
            </div>
        );
    }
}

export default AboutRuntimeTerror;
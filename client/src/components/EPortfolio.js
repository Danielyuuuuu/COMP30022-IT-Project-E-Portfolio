import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import Category from "./Category";
import "../App.css";

class EPortfolio extends Component {
    render(){
        return(
            <div>
                <NavbarTop/>
                <Category />
                <br />
                <br />
                <Category />
                <br />
                <br />
                <Category />
                
            </div>
        );
        
    };
}

export default EPortfolio;
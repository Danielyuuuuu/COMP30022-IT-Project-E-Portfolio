import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import Category from "./Category";
import HomeSlide from "./HomeSlide";
import "../App.css";


class EPortfolio extends Component {
    render(){
        return(
            <div>
                <NavbarTop/>
                <HomeSlide />
                <br />
                <br />
                
                
            </div>
        );
        
    };
}

export default EPortfolio;
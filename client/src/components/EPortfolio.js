import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import Category from "./Category";
import HomeSlide from "./HomeSlide";
import "../App.css";
import Footer from "./Footer";


class EPortfolio extends Component {
    render(){
        return(
            <div>
                <NavbarTop/>
                <HomeSlide />
                <br />
                <br />
                <Category />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Footer />
            </div>
        );
    };
}
export default EPortfolio;
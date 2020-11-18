import React, { Component } from "react";
import "../App.css";
import Category from "./Category";
import Footer from "./Footer";
import HomeSlide from "./HomeSlide";
import NavbarTop from "./NavbarTop";


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
    }
}
export default EPortfolio;
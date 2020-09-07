import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";

class Blog extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <h5>This is the blog.</h5>
                <Footer/>
            </div>
        );
    }
}

export default Blog;
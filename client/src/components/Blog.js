import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class Blog extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <h1>This is the blog.</h1>
            </div>
        );
    }
}

export default Blog;
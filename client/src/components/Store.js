import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class Store extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <h1>This is the store.</h1>
            </div>
        );
    }
}

export default Store;
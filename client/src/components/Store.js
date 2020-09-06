import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";

class Store extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <h5>This is the store.</h5>
            </div>
        );
    }
}

export default Store;
/*
import React, { Component } from "react";
import "../App.css";


class ShoppingCart extends React.Component{
    render(){
        return(
            <h1>ShoppingCart</h1>
        );
    }
}

export default ShoppingCart;
*/

import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function Example() {
  return (
    <UncontrolledDropdown>
      <DropdownToggle>ShoppingCart</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem disabled>Action</DropdownItem>
        <DropdownItem>Another Action</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Another Action</DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

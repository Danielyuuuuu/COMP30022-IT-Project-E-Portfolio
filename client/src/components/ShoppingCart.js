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
  CustomInput,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

const dropDownButtonStyle = {
  position: "absolute",
  right: "30px",
};

class ShoppingCart extends React.Component {
  render() {
    return (
      <UncontrolledDropdown style={dropDownButtonStyle}>
        <DropdownToggle color="success">ShoppingCart</DropdownToggle>
        <DropdownMenu>
          <FormGroup>
            <div>
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox"
                label="painting1"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox2"
                label="photography2"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox3"
                label="art product3"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox4"
                label="photography4"
              />
            </div>
          </FormGroup>

          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

export default ShoppingCart;

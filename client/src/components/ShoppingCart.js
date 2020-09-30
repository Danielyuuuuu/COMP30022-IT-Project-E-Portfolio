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
  Button,
} from "reactstrap";

import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const shoppingCartStyle = {
  position: "absolute",
  right: "30px",
};

const dropDownButtonStyle = {
  margin: "3% 6% 3% 6%",
};

class ShoppingCart extends React.Component {
  render() {
    return (
      <UncontrolledDropdown style={shoppingCartStyle}>
        <DropdownToggle>ShoppingCart</DropdownToggle>
        <DropdownMenu size="lg">
          <FormGroup style={dropDownButtonStyle} color="success">
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
          {/* <DropdownItem> */}
          {/* <Button outline color="success">
              Check Out
            </Button> */}
          <CheckOutModal buttonLabel="Check Out" className="" />
          {/* </DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const CheckOutModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  );

  return (
    <div>
      <Button color="success" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Check Out List:
        </ModalHeader>
        <ModalBody>
          <FormGroup style={dropDownButtonStyle} color="success">
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
              <br />
              <br />
              In Total: $12.00
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Pay Now
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShoppingCart;

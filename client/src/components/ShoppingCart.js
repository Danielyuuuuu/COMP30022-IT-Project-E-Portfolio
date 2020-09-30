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
import { Modal, ModalHeader, ModalBody, ModalFooter, Table } from "reactstrap";

const shoppingCartStyle = {
  position: "absolute",
  right: "30px",
};

const dropDownButtonStyle = {
  margin: "3% 6% 3% 6%",
};

const checkOutButtonStyle = {
  margin: "3% 20% 3% 20%",
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
                label="Camera"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox2"
                label="Old Grandpa"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox3"
                label="Colorful Forest"
              />
              <br />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox4"
                label="Painting"
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
      <Button color="success" onClick={toggle} style={checkOutButtonStyle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          Check Out List:
        </ModalHeader>
        <ModalBody>
          {/* <FormGroup style={dropDownButtonStyle} color="success">
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
          </FormGroup> */}
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Colorful Forest</td>
                <td>$55.00</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Camera</td>
                <td>$12.00</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Old Grandpa</td>
                <td>$200.00</td>
              </tr>
              {/* <tr>
                <th>In Total: $267.00</th>
              </tr> */}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          In Total: $267.00
          <Button
            color="primary"
            onClick={toggle}
            href="https://www.paypal.com/signin"
          >
            PayPal Now
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShoppingCart;

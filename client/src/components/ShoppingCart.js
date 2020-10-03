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
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Alert,
} from "reactstrap";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import StorefrontIcon from "@material-ui/icons/Storefront";

const shoppingCartStyle = {
  position: "absolute",
  right: "4%",
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
      <UncontrolledDropdown direction="down" style={shoppingCartStyle}>
        <DropdownToggle>
          Shopping
          <ShoppingCartIcon />
        </DropdownToggle>
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
          <CheckOutModal buttonLabel="Check Out" className="" />
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
                <th>
                  {/* <AssignmentTurnedInIcon /> */}
                  <CardGiftcardIcon />
                  {/* <StorefrontIcon /> */}
                </th>
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
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Alert color="success">In Total: $267.00 </Alert>

          <Button
            color="primary"
            onClick={toggle}
            href="/checkout"
          >
            PayPal
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShoppingCart;

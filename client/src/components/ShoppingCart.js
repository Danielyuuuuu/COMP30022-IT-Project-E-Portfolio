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
  ListGroup,
  ListGroupItem,
  Badge,
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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import { List } from "@material-ui/core";

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
  constructor(props) {
    super(props);

    this.state = {
      cart: this.props.cart,
    };
  }

  render() {
    return (
      <UncontrolledDropdown direction="down" style={shoppingCartStyle}>
        {this.props.cart.map((item) => {
          return item.name;
        })}

        <DropdownToggle>
          Shopping
          <ShoppingCartIcon />
        </DropdownToggle>
        <DropdownMenu size="lg">
          <ListGroup flush>
            {this.props.cart.map((item) => (
              <div>
                <ListGroupItem>
                  {item.name}
                  <IconButton
                    // aria-label="delete"
                    onClick={() => this.props.removeCartItem(item.name)}
                  >
                    <HighlightOffIcon color="secondary" fontSize="small" />
                  </IconButton>
                  <br />
                </ListGroupItem>
              </div>
            ))}
          </ListGroup>

          <CheckOutModal
            buttonLabel="Check Out"
            className=""
            cart={this.props.cart}
          />
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

const CheckOutModal = (props) => {
  const { buttonLabel, className, cart } = props;

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
              {cart.map((item) => (
                <tr>
                  <th scope="row"></th>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Alert color="success">
            In Total: $
            {cart.map((item) => item.price).reduce((a, b) => a + b, 0)}{" "}
          </Alert>

          <Button color="primary" onClick={toggle} href="/checkout">
            PayPal
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShoppingCart;

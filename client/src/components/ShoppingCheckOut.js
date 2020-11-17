import React, { Component } from "react";
import "../App.css";
import Footer from "./Footer";
import {
  Card,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
} from "reactstrap";

import { useState } from "react";
import axios from "axios";
import NavbarTop from "./NavbarTop";

const url = "/api/uploadManage/image/";

export default class CheckOutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myCart: JSON.parse(localStorage.getItem("cart")),
    };
    this.sendPayment = this.sendPayment.bind(this);
  }

  sendPayment(e) {
    e.preventDefault();

    console.log("require to buy ");

    //remove filename to avoid error
    var validation = JSON.parse(JSON.stringify(this.state.myCart));
    validation.map((item) => {
      delete item["filename"];
      console.log(item);
    });

    axios.post("/api/paypal/pay", validation).then((res) => {
      window.location.href = res.data.link;
    });
  }

  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col md={{ size: 10, offset: 5 }}>
            <font
              className="josefinFont"
              style={{ fontSize: "2.5rem" }}
              size={7}
            >
              {" "}
              CHECKOUTLIST
            </font>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />

        <div>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <ItemsTable body={this.state.myCart} />
            </Col>
          </Row>
        </div>
        <br />
        <div align="center">
          <Button size="lg" color="primary" r onClick={this.sendPayment}>
            Check and Pay
          </Button>{" "}
        </div>
      </div>
    );
  }
}

class ItemsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: this.props.body,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    this.updateTotal();
  }

  updateTotal() {
    var total = 0;
    JSON.parse(localStorage.getItem("cart")).map((item) => {
      total += item.quantity * item.price;
    });
    this.setState({ totalPrice: total });
  }

  removeCartItem(itemName) {
    let leftItems = this.state.cart.filter((item) => item.name != itemName);

    this.setState({ cart: leftItems });

    localStorage.setItem("cart", JSON.stringify(leftItems));

    this.updateTotal();


    window.location.href = "http://e-portfolio-website.herokuapp.com/checkout";

  }

  addQuantity(itemName) {
    console.log("Click at AddQuantity");

    this.state.cart.map((item) => {
      if (item.name == itemName) {
        {
          item.quantity++;
        }
      }
    });
    this.setState({ cart: this.state.cart });

    localStorage.setItem("cart", JSON.stringify(this.state.cart));

    this.updateTotal();
  }

  reduceQuantity(itemName) {
    this.state.cart.map((item) => {
      if (item.name == itemName && item.quantity >= 2) {
        {
          item.quantity--;
        }
      }
    });
    this.setState({ cart: this.state.cart });

    localStorage.setItem("cart", JSON.stringify(this.state.cart));

    this.updateTotal();

    console.log("Click at ReduceQuantity");
  }

  renderTableData() {
    var index = 1;
    return this.state.cart.map((good) => {
      //const {name,price,quantity} = good

      return (
        <tr>
          <td className="text-center">{index++}</td>
          <td>
            <img
              width={200}
              className=" img-fluid rounded shadow "
              src={"/api/uploadManage/image/" + good.filename}
            />
          </td>
          <td className=" td-name">
            <a href="/store-frontend" onClick={(e) => e.preventDefault()}>
              <h1>{good.name}</h1>
            </a>
          </td>
          <td>
            <big>{good.quantity + " "}</big>
            <Button
              onClick={() => this.addQuantity(good.name)}
              color="info"
              size="sm"
            >
              +
            </Button>

            <Button
              onClick={() => this.reduceQuantity(good.name)}
              color="info"
              size="sm"
            >
              -
            </Button>
          </td>
          <td>
            <h3>$ {good.price}</h3>
          </td>
          <td>
            <h3>$ {good.price * good.quantity}</h3>
          </td>
          <td>
            <Button
              size="sm"
              color="danger"
              onClick={() => this.removeCartItem(good.name)}
            >
              Remove
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Table className=" table-shopping" responsive>
          <thead>
            <tr>
              <th className="text-center"> </th>
              <th>PRODUCT</th>
              <th>NAME</th>
              <th>QTY</th>
              <th>PRICE (AUD)</th>
              <th>AMOUNT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableData()}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col md={{ size: 10, offset: 5 }}>
            <h1>Your Totals: $ {"   " + this.state.totalPrice}</h1>
          </Col>
        </Row>
      </div>
    );
  }
}

class AddressTable extends Component {
  constructor(props) {
    super(props);

    this.getAPrint = this.getAPrint.bind(this);

    this.state = {
      contacterName: "",
      phoneNumber: "",
      emailAddress: "",
      postcode: "",
      country: "",
      address: "",
    };
  }

  getAPrint() {
    localStorage.setItem("address", JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <Form>
          <Row form md="6">
            <Col>
              <FormGroup>
                <Label>Contacter's Name</Label>
                <Input
                  required
                  type="text"
                  placeholder="enter your name"
                  onChange={(e) =>
                    this.setState({ contacterName: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  required
                  type="text"
                  placeholder="enter your phone number"
                  onChange={(e) =>
                    this.setState({ phoneNumber: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row md="6">
            <Col>
              <FormGroup>
                <Label>Postcode</Label>
                <Input
                  required
                  type="text"
                  placeholder="Postcode"
                  onChange={(e) => this.setState({ postcode: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Country</Label>
                <Input
                  required
                  type="text"
                  placeholder="Country"
                  onChange={(e) => this.setState({ country: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form md="5">
            <FormGroup>
              <Label>Address</Label>
              <Input
                required
                type="text"
                placeholder="Please enter your address"
                onChange={(e) => this.setState({ address: e.target.value })}
              />
            </FormGroup>
          </Row>
        </Form>

        <Button onClick={() => this.getAPrint()}>Click on me</Button>
      </div>
    );
  }
}

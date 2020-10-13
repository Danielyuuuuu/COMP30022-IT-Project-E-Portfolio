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

const url = "http://localhost:8000/api/uploadManage/image/";

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
    axios.post("http://localhost:8000/api/paypal/pay", this.state.myCart).then((res) => {
      window.location.href = res.data.link;
    });
  }

  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <h1>CHECKOUTLIST</h1>
        <br />
        <br />
        <br />
        <br />
        <div>
          <ItemsTable body = {this.state.myCart}/>
        </div>
        <div>
          <Button size="lg" color="primary" onClick={this.sendPayment} >
            Check and Pay
          </Button>{" "}
        </div>
      </div>
    );
  }
}


class ItemsTable extends Component {
 
  constructor(props){
      super(props);
      
      this.state = 
        {
          cart: this.props.body,
          totalPrice : 0
        };
  }
  
  componentDidMount(){
    this.updateTotal();
  }

  updateTotal(){
    
    var total = 0;
    this.state.cart.map((item) => {
        total += item.quantity * item.price
    })
    this.setState({totalPrice: total})
    
  }
  
  removeCartItem(itemName) {


    let leftItems = this.state.cart.filter((item) => item.name != itemName);

    this.setState({ cart : leftItems });
    
    localStorage.setItem("cart", JSON.stringify(leftItems));

    this.updateTotal();

  }
  
  addQuantity(itemName) {

    console.log("Click at AddQuantity");
    
    this.state.cart.map((item) => {
        if (item.name == itemName){
            {item.quantity ++}
        }
    })
    this.setState({ cart : this.state.cart });

    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    
    this.updateTotal();



  }
  
  reduceQuantity(itemName) {
    console.log(this.state.cart);
    
    this.state.cart.map((item) => {
        if (item.name == itemName && item.quantity >= 1){
            {item.quantity --}
        }
    })
    this.setState({ cart : this.state.cart });

    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    
    this.updateTotal();

    console.log("Click at AddQuantity");
    console.log(localStorage.cart);
  }


  renderTableData(){
     
      var index = 1;
      return this.state.cart.map( (good) =>{
        //const {name,price,quantity} = good

        return (
            <tr>
                <td>{index++}</td>
                <td>
                    <img
                    height="20%"
                    width="20%"
                    src="http://localhost:8000/api/uploadManage/image/cff15ed84dad8a582143ce1ada541820.png"
                    />
                </td>
                <td>{good.name}</td>
                <td>
                    <Form >
                        <Input 
                            vertical-align = "top"
                            size = "1"
                            type ="text"
                            placeholder={good.quantity}

                        />
                    </Form>
                    <Button onClick={() => this.addQuantity(good.name)} color="primary" size="sm">
                        +
                    </Button>
                    <Button onClick={() => this.reduceQuantity(good.name)} color="primary" size="sm">
                        -
                    </Button>
                </td>
                <td>{good.price}</td>
                <td>{good.price*good.quantity} </td>
                <td>
                    <Button size="sm" color="danger" onClick={() => this.removeCartItem(good.name)}>
                    {" "}
                    Remove
                    </Button>
                </td>
            </tr> 
        )
      })
  }  

  render() {
      return (
          <Table >
              <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Price</th>
                    <th>Total</th>
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
                    <td>{this.state.totalPrice}</td>
                </tr>
              </tbody>
          </Table>
      )
  }

}

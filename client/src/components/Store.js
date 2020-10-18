import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import StoreCategoryList from "./StoreCategoryList";
import Footer from "./Footer";
import ShoppingCart from "./ShoppingCart";
import "../App.css";
import { CustomInput, Form, FormGroup, Label, Input } from "reactstrap";

import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
} from "reactstrap";

//const url = "http://localhost:8000/api/store/image/";
const url = "http://localhost:8000/api/uploadManage/image/";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      tags: [],
      filter: "latest",
      cart: [],
    };
    this.updateCart = this.updateCart.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
  }

  updateCart(itemName, itemPrice, imageName) {
    // const index = this.state.cart.indexOf(itemName);
    // if (index < 0) {
    //   this.state.cart.push(itemName);
    // }
    let selectedItems = this.state.cart.filter((item) => item.name == itemName);
    if (selectedItems.length == 0) {
      this.state.cart.push({
        name: itemName,
        price: itemPrice,
        filename: imageName,
        quantity: 1,
      });
    }
    this.setState({ cart: this.state.cart });
    console.log(this.state.cart);
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
  }

  removeCartItem(itemName) {
    // const index = this.state.cart.indexOf(itemName);
    // console.log(index);
    // console.log(this.state.cart);
    // console.log(itemName);
    // if (index >= 0) {
    //   this.state.cart.splice(index, 1);
    // }

    let leftItems = this.state.cart.filter((item) => item.name != itemName);
    this.setState({ cart: leftItems });

    console.log(this.state.cart);

    localStorage.setItem("cart", JSON.stringify(leftItems));
    console.log("You can remove!");
  }

  updateTags(tagName) {
    // this.state.tags = [...this.state.tags, tagName];
    // this.setState({ tags: tagName });
    console.log(this.state.tags);

    const index = this.state.tags.indexOf(tagName);
    if (index < 0) {
      this.state.tags.push(tagName);
    } else {
      this.state.tags.splice(index, 1);
    }
    this.setState({ tags: this.state.tags });
    console.log(this.state.tags);

    let tagsArray = this.state.tags;
    if (tagsArray.length < 1) {
      tagsArray = ["photography", "painting", "art product"];
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // tags: this.state.tags,
        tags: tagsArray,
        filter: this.state.filter,
      }),
    };
    fetch("http://localhost:8000/api/store/filter", req)
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.specific_items }));
  }

  updateSortFilter(filterName) {
    this.setState({ filter: filterName });
    console.log(this.state.filter);
  }

  componentDidMount() {
    let cartCookieData = JSON.parse(localStorage.getItem("cart"));

    if (Array.isArray(cartCookieData)) {
      this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
    }

    fetch("http://localhost:8000/api/store/")
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.item }));
  }

  filterStoreItems(e) {
    e.preventDefault();
    let tagsArray = this.state.tags;
    if (tagsArray.length < 1) {
      tagsArray = ["photography", "painting", "art product"];
    }
    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // tags: this.state.tags,
        tags: tagsArray,
        filter: this.state.filter,
      }),
    };
    fetch("http://localhost:8000/api/store/filter", req)
      .then((res) => res.json())
      .then((data) => this.setState({ data: data.specific_items }));
  }

  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <ShoppingCart
          cart={this.state.cart}
          removeCartItem={this.removeCartItem}
        />
        <div className="store">
          <div className="store-menu">
            <Form>
              <FormGroup>
                <Label for="exampleSearch">Search</Label>
                <Input
                  type="search"
                  name="search"
                  id="exampleSearch"
                  placeholder="search placeholder"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleCheckbox">Category</Label>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox11"
                    label="painting"
                    onClick={() => this.updateTags("painting")}
                  />
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox12"
                    label="photography"
                    onClick={() => this.updateTags("photography")}
                  />
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox121"
                    label="art product"
                    onClick={() => this.updateTags("art product")}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="exampleCheckbox">Sorted by</Label>
                <div>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio"
                    name="customRadio"
                    label="Most Popular"
                    onClick={() => this.updateSortFilter("popular")}
                  />
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio2"
                    name="customRadio"
                    label="Latest"
                    onClick={() => this.updateSortFilter("latest")}
                  />
                </div>
              </FormGroup>
              <Button onClick={(e) => this.filterStoreItems(e)}>Sort Me</Button>
            </Form>
            {/* <StoreCategoryList /> */}
          </div>
          <div className="store-items">
            {/* <StoreItems data={data}/> */}

            {this.state.data !== null && (
              <StoreItems data={this.state.data} updateCart={this.updateCart} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

class StoreItems extends React.Component {
  render() {
    return (
      <div>
        <Items data={this.props.data} updateCart={this.props.updateCart} />
      </div>
    );
  }
}

class Items extends Component {
  render() {
    return (
      <div className="store-items-flexible">
        {this.props.data.map((data) => {
          return (
            <Item
              data={data}
              key={data.id}
              updateCart={this.props.updateCart}
            />
          );
        })}
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      mouseOver: false,
    };
    this._clickHandler = this._clickHandler.bind(this);
    this._mouseEnter = this._mouseEnter.bind(this);
    this._mouseLeave = this._mouseLeave.bind(this);
  }

  _clickHandler(itemId) {
    // e.preventDefault();
    console.log(itemId);
    if (this.state.open === false) {
      this.setState({
        open: true,
      });

      const url_prefix = "http://localhost:8000/api/store/update/";
      const url_suffix = "/views";
      const url_view = url_prefix + itemId + url_suffix;
      console.log(url_view);
      fetch(url_view, { method: "PUT" })
        .then((res) => res.json())
        .then((a) => console.log(a));
    } else {
      this.setState({
        open: false,
      });
    }
  }
  _mouseEnter(e) {
    e.preventDefault();
    if (this.state.mouseOver === false) {
      console.log(this.props.data.name);
      this.setState({
        mouseOver: true,
      });
    }
  }
  _mouseLeave(e) {
    e.preventDefault();
    if (this.state.mouseOver === true) {
      this.setState({
        mouseOver: false,
      });
    }
  }

  render() {
    let itemStyle = {};
    if (this.state.open) {
      itemStyle = {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        objectFit: "contain",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        transform: "none",
        zIndex: 50,
        boxSizing: "border-box",
        margin: 0,
        padding: "10vh 10vw",
        cursor: "pointer",
      };
    } else {
      itemStyle = {
        maxWidth: "18vw",
        maxHeight: "18vw",
        cursor: "zoom-in",
      };
    }
    return (
      <Card body className="store-itemCard">
        <CardImg
          style={itemStyle}
          onMouseEnter={this._mouseEnter}
          onMouseLeave={this._mouseLeave}
          onClick={() => this._clickHandler(this.props.data._id)}
          src={url + this.props.data.imagename}
          alt={this.props.data.name}
        />
        <br />
        <CardTitle>{this.props.data.itemname} </CardTitle>
        <CardText>{this.props.data.description}</CardText>
        <CardTitle>${this.props.data.price}</CardTitle>
        <Button
          onClick={() =>
            this.props.updateCart(
              this.props.data.itemname,
              this.props.data.price,
              this.props.data.imagename
            )
          }
        >
          Add to the cart
        </Button>
      </Card>
    );
  }
}

export default Store;

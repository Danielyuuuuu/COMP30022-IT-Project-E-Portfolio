import { SnackbarProvider, useSnackbar } from "notistack";
import React, { Component } from "react";
import {
  Button, Card,



  CardImg, CardText, CardTitle, CustomInput, Form, FormGroup, Label
} from "reactstrap";
import "../App.css";
import Footer from "./Footer";
import NavbarTop from "./NavbarTop";
import ShoppingCart from "./ShoppingCart";



//const url = "/api/store/image/";
const url = "/api/uploadManage/image/";

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
    let selectedItems = this.state.cart.filter((item) => item.name === itemName);
    if (selectedItems.length === 0) {
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

    let leftItems = this.state.cart.filter((item) => item.name !== itemName);
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
      tagsArray = ["Photography", "Painting", "Art Product"];
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
    fetch("/api/store/filter", req)
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

    fetch("/api/store/")
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.item }));
  }

  filterStoreItems(e) {
    e.preventDefault();
    let tagsArray = this.state.tags;
    if (tagsArray.length < 1) {
      tagsArray = ["Photography", "Painting", "Art Product"];
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
    fetch("/api/store/filter", req)
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
              <br />
              <br />
              {/* <FormGroup>
                <Label for="exampleSearch">Search</Label>
                <Input
                  type="search"
                  name="search"
                  id="exampleSearch"
                  placeholder="search placeholder"
                />
              </FormGroup> */}
              <FormGroup>
                <Label
                  className="josefinFont"
                  style={{ fontSize: "1.5rem" }}
                  for="exampleCheckbox"
                >
                  Category
                </Label>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox11"
                    label="Painting"
                    className="josefinFont"
                    onClick={() => this.updateTags("Painting")}
                  />
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox12"
                    label="Photography"
                    className="josefinFont"
                    onClick={() => this.updateTags("Photography")}
                  />
                  <CustomInput
                    type="checkbox"
                    id="exampleCustomCheckbox121"
                    label="Art Product"
                    className="josefinFont"
                    onClick={() => this.updateTags("Art Product")}
                  />
                </div>
              </FormGroup>
              <br />
              <FormGroup>
                <Label
                  className="josefinFont"
                  style={{ fontSize: "1.5rem" }}
                  for="exampleCheckbox"
                >
                  Sorted by
                </Label>
                <div>
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio"
                    name="customRadio"
                    label="Most Popular"
                    className="josefinFont"
                    onClick={() => this.updateSortFilter("popular")}
                  />
                  <CustomInput
                    type="radio"
                    id="exampleCustomRadio2"
                    name="customRadio"
                    label="Latest"
                    className="josefinFont"
                    onClick={() => this.updateSortFilter("latest")}
                  />
                </div>
              </FormGroup>
              <Button
                style={{ backgroundColor: "#c19575", borderColor: "white" }}
                onClick={(e) => this.filterStoreItems(e)}
              >
                Sort Me
              </Button>
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
      inCart: "",
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

      const url_prefix = "/api/store/update/";
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

  setInCart = (e) => {
    this.setState({ inCart: e });
  };

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
        // maxWidth: "18vw",
        // maxHeight: "18vw",
        // width: "15vw",
        // height: "9vw",
        cursor: "zoom-in",
        width: 285,
        height: 220,
      };
    }
    return (
      <Card
        body
        className="store-itemCard"
        style={{ backgroundColor: "floralwhite" }}
      >
        <CardImg
          style={itemStyle}
          onMouseEnter={this._mouseEnter}
          onMouseLeave={this._mouseLeave}
          onClick={() => this._clickHandler(this.props.data._id)}
          src={url + this.props.data.imagename}
          alt={this.props.data.name}
        />
        <br />
        <CardTitle
          className="josefinFont"
          style={{ fontSize: "1.3rem", fontWeight: "bold" }}
        >
          {this.props.data.itemname}{" "}
        </CardTitle>
        <CardText className="josefinFont">
          {this.props.data.description}
        </CardText>
        <CardTitle style={{ fontWeight: "bold" }}>
          ${this.props.data.price}
        </CardTitle>

        {/* <Button
          onClick={() =>
            this.props.updateCart(
              this.props.data.itemname,
              this.props.data.price,
              this.props.data.imagename
            )
          }
        >
          Add to the cart
        </Button> */}

        <SnackbarProvider maxSnack={3}>
          <MyApp updateCart={this.props.updateCart} data={this.props.data} />
          {/* <MyApp /> */}
        </SnackbarProvider>

        {/* {this.state.error && (
          <div>
            <Spinner color="primary" />
            <ErrorNotice message={"Added to the cart!"} severity={"success"} />
          </div>
        )} */}

        {/* <ErrorNotice
          message={"Added to the cart!"}
          severity={"success"}
          // clearError={() => this.setState(undefined)}
        /> */}
      </Card>
    );
  }
}

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("Added to the cart!", { variant });
  };

  return (
    <React.Fragment>
      {/* <Button_UI onClick={handleClickVariant("success")}> */}
      <Button
        onClick={() => {
          handleClickVariant("success")();
          props.updateCart(
            props.data.itemname,
            props.data.price,
            props.data.imagename
          );
        }}
      >
        Add to the cart
      </Button>
    </React.Fragment>
  );
}

// export function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <MyApp />
//     </SnackbarProvider>
//   );
// }

export default Store;

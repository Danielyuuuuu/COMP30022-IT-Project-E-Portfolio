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

/*
const StoreItems = (props) => {
  return (
    <div>
        <Card body
        >
            <CardImg width="100%" src="http://localhost:8000/api/store/image/af53b98e05f7845bd201ac73fcb3dd8f.png" alt="Card image cap" />
          <CardTitle>Art product  $5.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
        <CardImg width="100%" src="https://www.fineartbyhelenreimer.com/images/intercessory-worship-high-res.jpg" alt="Card image cap" />
          <CardTitle>Painting  $7.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
            <CardImg width="100%" src="https://www.montmarte.net/assets/Uploads/_resampled/FillWyI5MDAiLCI1MDAiXQ/Leonid-Afremov-inspired-painting-1.jpg" alt="Card image cap" />
          <CardTitle>Painting  $10.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
        <CardImg width="100%" src="https://redballoon.com.au/dw/image/v2/BCRD_PRD/on/demandware.static/-/Sites-rb-au-catalog/default/images/products/PWA014-M/hhaubjsf4lbthjnsmfjs.jpg?sw=784&sh=431&q=70" alt="Card image cap" />
          <CardTitle>Photography  $3.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

    </div> 

  );
};
*/

const data = [
  {
    id: 2,
    name: "Forest",
    price: "3",
    description: "Amazing!!!",
    image:
      "https://images.unsplash.com/photo-1468851508491-4f854ec88aa0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=b1222b6a1d3694cac76d2a23c3a02254",
  },
  {
    id: 4,
    price: "4",
    description: "Amazing!!!",
    name: "Mountain",
    image:
      "https://images.unsplash.com/photo-1467890947394-8171244e5410?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9396f0adf263b51b44626228225684d0",
  },
  {
    id: 5,
    name: "Boat",
    price: "35",
    description: "Amazing!!!",
    image:
      "https://images.unsplash.com/photo-1443302382600-0bfacc473376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=0c0f26518c1001f67b6c2e4480a8d3e0",
  },
  {
    id: 6,
    name: "Flowers",
    price: "6",
    description: "Amazing!!!",
    image:
      "https://images.unsplash.com/photo-1429091443922-e7d9ae79a837?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=e81cb6a60c53788559edb9bec21b80fc",
  },
];

//const url = "http://localhost:8000/api/store/image/";
const url = "http://localhost:8000/api/uploadManage/image/";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      tags: [],
      filter: "latest",
    };
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
  }

  updateSortFilter(filterName) {
    this.setState({ filter: filterName });
  }

  componentDidMount() {
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
        <ShoppingCart />
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
              <Button onClick={(e) => this.filterStoreItems(e)}>Submit</Button>
            </Form>
            {/* <StoreCategoryList /> */}
          </div>
          <div className="store-items">
            {/* <StoreItems data={data}/> */}

            {this.state.data !== null && <StoreItems data={this.state.data} />}
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
        <Items data={this.props.data} />
      </div>
    );
  }
}

class Items extends Component {
  render() {
    return (
      <div className="store-items-flexible">
        {this.props.data.map((data) => {
          return <Item data={data} key={data.id} />;
        })}
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card body className="store-itemCard">
        <CardImg
          src={url + this.props.data.imagename}
          alt={this.props.data.name}
        />
        <br />
        <CardTitle>{this.props.data.itemname} </CardTitle>
        <CardText>{this.props.data.description}</CardText>
        <CardTitle>${this.props.data.price}.00</CardTitle>

        <Button>Buy now</Button>
      </Card>
    );
  }
}

export default Store;

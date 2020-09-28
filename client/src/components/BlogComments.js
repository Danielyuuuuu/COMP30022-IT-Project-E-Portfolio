import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Media,
} from "reactstrap";
import { Comment, Icon, Header } from "semantic-ui-react";
import axios from "axios";

export default class BlogComments extends Component {
  constructor(props) {
    super(props);
    this.getComments = this.getComments.bind(this);
    this.state = {
      comments: [],
      success: false,
    };
  }

  getComments() {
    console.log("Before axios");
    axios
      .get("http://localhost:8000/api/comments/blog/5f703c3b07005138f07a2107")
      .then((res) => {
        this.setState({ success: res.success });
      });
    console.log(this.comments);
    console.log("After axios");
  }
}

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
import { useHistory } from "react-router-dom";

export default class addComment extends Component {
  constructor(props) {
    super(props);

    this.writingComment = this.writingComment.bind(this);
    this.writingPublisher = this.writingPublisher.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      content: "",
      publisher: "",
      blogId: "5f71c425ec797250a88b4701",
    };
  }

  writingPublisher(e) {
    this.setState({
      publisher: e.target.value,
    });
  }
  writingComment(e) {
    this.setState({
      content: e.target.value,
    });
  }

  submitComment(e) {
    e.preventDefault();
    const comment = {
      content: this.state.content,
      publisher: this.state.publisher,
      blogId: this.state.blogId,
    };
    console.log("Submit success ");
    console.log(e);
    axios
      .post("http://localhost:8000/api/comments/add", comment)
      .then((res) => {
        this.setState({
          content: "",
          publisher: "",
        });
        window.location.reload(false);
      });
  }

  render() {
    return (
      <div>
        <Form style={{ marginTop: 20 }}>
          <FormGroup>
            <Input
              required
              type="text"
              placeholder="Enter your name..."
              onChange={this.writingPublisher}
            />
          </FormGroup>
          <FormGroup>
            <Input
              required
              type="textarea"
              placeholder="Leave a Comment..."
              onChange={this.writingComment}
            />
          </FormGroup>
          <Button size="sm" onClick={this.submitComment}>
            Submit Comment
          </Button>
        </Form>
      </div>
    );
  }
}

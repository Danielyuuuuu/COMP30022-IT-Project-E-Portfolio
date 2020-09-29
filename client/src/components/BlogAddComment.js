import React, { Component } from "react";
import "../App.css";
import { Button, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

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
      profilePhotos: [
        "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
        "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
        "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
        "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
        "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
        "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
      ],
      error: "",
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
      blogId: this.state.blogId,
      publisher: this.state.publisher,
      content: this.state.content,
      profilePhoto: this.state.profilePhotos[
        Math.floor(Math.random() * this.state.profilePhotos.length)
      ],
    };
    console.log("Submit success ");
    axios
      .post("http://localhost:8000/api/comments/add", comment)
      .then((res) => {
        this.setState({
          content: "",
          publisher: "",
        });
        window.location.reload(false);
      })
      .catch((err) => {
        this.setState({ error: err.response.data.msg });
      });
  }

  setError = (e) => {
    this.setState({ error: e });
  };

  render() {
    return (
      <div>
        {this.state.error && (
          <ErrorNotice
            message={this.state.error}
            clearError={() => this.setError(undefined)}
          />
        )}
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

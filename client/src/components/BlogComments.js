import React, { Component } from "react";
import "../App.css";

import axios from "axios";

export default class BlogComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      success: false,
    };
  }

  componentDidMount() {
    console.log("Before axios");
    fetch("http://localhost:8000/api/comments/blog/5f71c425ec797250a88b4701")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ comments: res });
        this.setState({ success: res });
      });
    console.log(this.state.comments);
    console.log(this.state.success);
    console.log("After axios");
  }

  render() {
    return <div></div>;
  }
}

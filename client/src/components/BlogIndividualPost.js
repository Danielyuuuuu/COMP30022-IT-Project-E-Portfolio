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

import AddComment from "./BlogAddComment";

import BlogComments from "./BlogComments";

import BlogIndividualPostContent from "./BlogIndividualPostContent";

class BlogIndividualPost extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     blogId: "",
  //   };
  // }
  // componentDidMount() {
  //   const {
  //     match: { params },
  //   } = this.props;
  //   console.log("id is: " + params.id);
  //   this.setState({ blogId: params.id });
  //   console.log("id from state is : " + this.state.blogId);
  //   console.log(this.props.match.params.id);
  // }

  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <BlogIndividualPostContent blogId={this.props.match.params.id} />
        <Footer />
      </div>
    );
  }
}

export default BlogIndividualPost;

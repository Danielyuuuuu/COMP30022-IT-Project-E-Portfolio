import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";

class BlogIndividualPost extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <PostContent />
        <Footer />
      </div>
    );
  }
}

class PostContent extends Component {
  render() {
    return (
      <div>
        <p>This is from the postContent</p>
      </div>
    );
  }
}

export default BlogIndividualPost;

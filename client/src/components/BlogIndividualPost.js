import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import BlogIndividualPostContent from "./BlogIndividualPostContent";

class BlogIndividualPost extends Component {
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

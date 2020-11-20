import React, { Component } from "react";
import "../App.css";
import BlogIndividualPostContent from "./BlogIndividualPostContent";
import Footer from "./Footer";
import NavbarTop from "./NavbarTop";



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

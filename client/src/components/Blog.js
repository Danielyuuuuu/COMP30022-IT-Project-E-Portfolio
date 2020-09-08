import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import BlogPost from "./BlogPost";

class Blog extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <h5>This is the blog.</h5>
        <BlogPost />
      </div>
    );
  }
}

export default Blog;

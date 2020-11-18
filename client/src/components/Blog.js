import React, { Component } from "react";
import "../App.css";
import BlogPost from "./BlogPost";
import Footer from "./Footer";
import NavbarTop from "./NavbarTop";

class Blog extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <BlogPost />
        <Footer />
      </div>
    );
  }
}

export default Blog;

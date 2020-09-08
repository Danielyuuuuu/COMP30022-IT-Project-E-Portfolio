import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import BlogPost from "./BlogPost";
import SearchBar from "./SearchBar";

class Blog extends Component {
  render() {
    return (
      <div>
        <NavbarTop />
        <br />
        <br />
        <br />
        <h5>This is the blog.</h5>
        <SearchBar />
        <BlogPost />
        <Footer />
      </div>
    );
  }
}

export default Blog;

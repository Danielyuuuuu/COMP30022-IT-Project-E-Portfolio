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
        <SearchBar />
        <BlogPost />
        <Footer />
      </div>
    );
  }
}

export default Blog;

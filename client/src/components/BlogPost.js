import React, { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
    };
  }

  componentDidMount() {
    console.log("Before axios");
    fetch("http://localhost:8000/api/blog/getAllBlogs")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ blogPosts: res });
        console.log("In axios");
        console.log(this.state.blogPosts);
      });
    console.log("After axios");
  }

  render() {
    return (
      <div className="posts">
        {this.state.blogPosts.map((blogPost) => {
          return (
            <CardGroup className="individualPost">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={blogPost.thumbnails.imagename}
                  alt="Thumbnails"
                />
              </Card>
              <Card>
                <CardBody>
                  <EllipsisButton />
                  <CardTitle>
                    <a href={"/individualpost/" + blogPost._id}>
                      {blogPost.title}
                    </a>
                  </CardTitle>
                  <CardText>{blogPost.content}</CardText>
                  <LikeButton />
                </CardBody>
              </Card>
            </CardGroup>
          );
        })}
      </div>
    );
  }
}

class EllipsisButton extends Component {
  constructor(props) {
    super();

    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div>
        <Dropdown
          isOpen={this.state.clicked}
          toggle={this.handleClick}
          className="blogEllipsis-v"
        >
          <DropdownToggle>
            <i
              className={
                this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
              }
            ></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Share</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

class LikeButton extends Component {
  constructor(props) {
    super();

    this.state = {
      clicked: false,
    };
  }
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div className="blogHeart" onClick={this.handleClick}>
        <i className={this.state.clicked ? "fas fa-heart" : "far fa-heart"}></i>
      </div>
    );
  }
}

export default BlogPost;

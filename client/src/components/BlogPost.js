import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/blog/getAllBlogs")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ blogPosts: res });
      });
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
                  {/* <EllipsisButton /> */}
                  <CardTitle>
                    <a href={"/individualpost/" + blogPost._id}>
                      <h3>{blogPost.title}</h3>
                    </a>
                  </CardTitle>
                  <CardText>
                    {blogPost.content.split(" ").splice(0, 100).join(" ") +
                      "..."}
                  </CardText>
                  <div className="flexDisplay">
                    {blogPost.hashtags.map((hashtag) => {
                      return (
                        <div style={{ marginRight: 3 }}>
                          <h3>
                            <Badge color="primary">{hashtag}</Badge>
                          </h3>
                        </div>
                      );
                    })}
                  </div>
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

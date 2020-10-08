import React, { Component } from "react";
import "../App.css";
import { CardImg, CardTitle, CardText, CardBody, Badge } from "reactstrap";
import { Header } from "semantic-ui-react";
import AddComment from "./BlogAddComment";
import BlogComments from "./BlogComments";

export default class PostContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      image: "",
      hashtags: [],
    };
  }
  componentDidMount() {
    fetch("http://localhost:8000/api/blog/getSingleBlog/" + this.props.blogId)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          title: res.title,
          content: res.content,
          image: res.thumbnails.imagename,
          hashtags: res.hashtags,
        });
      });
  }

  render() {
    return (
      <div className="postContent">
        <CardTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>{this.state.title}</h3>
        </CardTitle>
        <CardImg top width="100%" src={this.state.image} alt="Image" />
        <CardBody>
          <CardText>{this.state.content}</CardText>
          <div className="flexDisplay ">
            {this.state.hashtags.map((hashtag) => {
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
        <div className="commentSection">
          <Header
            as="h3"
            dividing
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Comment Section
          </Header>
          <BlogComments blogId={this.props.blogId} />
          <div className="container">
            <AddComment blogId={this.props.blogId} />
          </div>
        </div>
      </div>
    );
  }
}

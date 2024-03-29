import Chip from "@material-ui/core/Chip";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import axios from "axios";
import React, { Component } from "react";
import {
  CardBody, CardImg,

  CardText, CardTitle
} from "reactstrap";
import "../App.css";
import BlogComments from "./BlogComments";




let marked = require("marked");

export default class PostContent extends Component {
  constructor(props) {
    super(props);

    this.writingComment = this.writingComment.bind(this);
    this.writingPublisher = this.writingPublisher.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      title: "",
      content: "",
      image: "",
      hashtags: [],
      publisher: "",
      blogId: this.props.blogId,
      profilePhotos: [
        "https://react.semantic-ui.com/images/avatar/small/matt.jpg",
        "https://react.semantic-ui.com/images/avatar/small/elliot.jpg",
        "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
        "https://react.semantic-ui.com/images/avatar/small/joe.jpg",
        "https://react.semantic-ui.com/images/avatar/small/stevie.jpg",
        "https://react.semantic-ui.com/images/avatar/small/steve.jpg",
        "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
      ],
      error: "",
    };
  }

  fetchIndividualPostContent = async () => {
    fetch("/api/blog/getSingleBlog/" + this.props.blogId)
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          title: res.title,
          content: res.content,
          image: res.thumbnails.imagename,
          hashtags: res.hashtags,
        });
      });
  };

  componentDidMount() {
    this.fetchIndividualPostContent();
  }

  writingPublisher(e) {
    this.setState({
      publisher: e.target.value,
    });
  }
  writingComment(e) {
    this.setState({
      content: e.target.value,
    });
  }

  submitComment(e) {
    e.preventDefault();
    const comment = {
      blogId: this.state.blogId,
      publisher: this.state.publisher,
      content: this.state.content,
      profilePhoto: this.state.profilePhotos[
        Math.floor(Math.random() * this.state.profilePhotos.length)
      ],
    };
    console.log("Submit success ");
    axios
      .post("/api/comments/add", comment)
      .then((res) => {
        this.setState({
          content: "",
          publisher: "",
        });
      })
      .catch((err) => {
        this.setState({ error: err.response.data.msg });
      });
  }

  setError = (e) => {
    this.setState({ error: e });
  };

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
          <h3 className="josefinFont" style={{ fontSize: "3rem" }}>
            {this.state.title}
          </h3>
        </CardTitle>
        <CardImg top width="100%" src={this.state.image} alt="Image" />
        <CardBody>

          <CardText><div dangerouslySetInnerHTML={{ __html: marked(this.state.content) }}/></CardText>

          <div className="flexDisplay ">
            {this.state.hashtags.map((hashtag) => {
              return (
                <div style={{ marginRight: 3 }}>
                  <Chip icon={<LocalOfferIcon />} label={hashtag} />
                </div>
              );
            })}
          </div>
        </CardBody>
        <BlogComments blogId={this.props.blogId} />
      </div>
    );
  }
}

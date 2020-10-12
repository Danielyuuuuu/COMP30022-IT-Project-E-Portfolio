import React, { Component } from "react";
import "../App.css";
import { Comment } from "semantic-ui-react";
import Axios from "axios";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ErrorNotice from "../misc/ErrorNotice";

export default class BlogComments extends Component {
  constructor(props) {
    super(props);

    this.writingComment = this.writingComment.bind(this);
    this.writingPublisher = this.writingPublisher.bind(this);
    this.submitComment = this.submitComment.bind(this);

    this.state = {
      comments: [],
      success: false,
      token: localStorage.getItem("auth-token"),
      content: "",
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

  componentDidMount() {
    this.getAllComments();
  }

  getAllComments = async () => {
    fetch("http://localhost:8000/api/comments/blog/" + this.props.blogId)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ comments: res.item, success: res.success });
      });
  };

  handleDelete = (e) => {
    console.log("Comment deleted: " + e);
    Axios.delete("http://localhost:8000/api/comments/" + e)
      .then((res) => {
        this.setState({
          comments: this.state.comments.filter((comment) => comment._id !== e),
        });
      })
      .catch((err) => {
        console.log(Error);
      });
  };

  writingPublisher(e) {
    this.setState({
      publisher: e.target.value,
    });
    this.setState({ error: "" });
  }
  writingComment(e) {
    this.setState({
      content: e.target.value,
    });
    this.setState({ error: "" });
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
    this.setState({
      publisher: "",
      content: "",
    });

    console.log("Submit success ");
    Axios.post("http://localhost:8000/api/comments/add", comment)
      .then((res) => {
        this.setState({
          content: "",
          publisher: "",
        });
        this.getAllComments();
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
      <div style={{ marginLeft: 150 }}>
        <Comment.Group>
          {this.state.comments.map((comment) => {
            return (
              <div>
                <Comment>
                  <Comment.Avatar as="a" src={comment.profilePhoto} />
                  <Comment.Content>
                    <Comment.Author>{comment.publisher}</Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.date.slice(0, 10)}</div>
                      <div>
                        <LikeButton id={comment._id} likes={comment.favours} />
                      </div>
                      <div>{comment.favours} Faves</div>
                      {this.state.token ? (
                        <div>
                          {/* <p>&nbsp; &nbsp;</p> */}
                          <button
                            className="deleteButton"
                            onClick={() => this.handleDelete(comment._id)}
                          >
                            <i className="fas fa-times"></i>
                          </button>{" "}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>
            );
          })}
          <div>
            {this.state.error && (
              <ErrorNotice
                message={this.state.error}
                clearError={() => this.setError(undefined)}
              />
            )}
            <Form style={{ marginTop: 20 }}>
              <FormGroup rows="3">
                <Input
                  required
                  value={this.state.publisher}
                  type="text"
                  placeholder="Enter your name..."
                  onChange={this.writingPublisher}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  value={this.state.content}
                  type="textarea"
                  placeholder="Leave a Comment..."
                  onChange={this.writingComment}
                />
              </FormGroup>
              <Button size="sm" onClick={this.submitComment}>
                Submit Comment
              </Button>
            </Form>
          </div>
        </Comment.Group>
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
    if (this.state.clicked) {
      console.log("un-liked");
      console.log(this.props.id);
      console.log(this.props.likes);
    } else {
      console.log("liked");
      console.log(this.props.id);
      console.log(this.props.likes);
      const commentReq = {
        id: this.props.id,
        likes: this.props.likes,
      };
      Axios.post(
        "http://localhost:8000/api/comments/addLike",
        commentReq
      ).catch((err) => {
        console.log(err);
      });
      window.location.reload(false);
    }
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div onClick={() => this.handleClick()} className="likeButton">
        <i className={this.state.clicked ? "fas fa-heart" : "far fa-heart"}></i>
      </div>
    );
  }
}

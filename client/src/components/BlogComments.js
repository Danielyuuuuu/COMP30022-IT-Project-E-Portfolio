import Axios from "axios";
import React, { Component } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Comment, Header } from "semantic-ui-react";
import "../App.css";
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
      severity: "error",
    };
  }

  componentDidMount() {
    this.getAllComments();
  }

  getAllComments = async () => {
    fetch("/api/comments/blog/" + this.props.blogId)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ comments: res.item, success: res.success });
      });
  };

  handleDelete = (e) => {
    Axios.delete("/api/comments/" + e)
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
    Axios.post("/api/comments/add", comment)
      .then((res) => {
        this.setState({
          content: "",
          publisher: "",
          error: "Submit Successful",
          severity: "success",
        });
        this.getAllComments();
      })
      .catch((err) => {
        this.setState({ error: err.response.data.msg, severity: "error" });
      });
  }

  setError = (e) => {
    this.setState({ error: e });
  };

  render() {
    return (
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
        <div className="commentGroup">
          <Comment.Group>
            {this.state.comments.map((comment) => {
              return (
                <div className="individualComment">
                  <Comment>
                    <Comment.Avatar as="a" src={comment.profilePhoto} />
                    <Comment.Content>
                      <Comment.Author>{comment.publisher}</Comment.Author>
                      <Comment.Metadata>
                        <div>{comment.date.slice(0, 10)}</div>
                        <div>
                          <LikeButton id={comment._id} likes={comment.favours} callBack={this.getAllComments} />
                        </div>
                        <div>{comment.favours} Faves</div>
                        {this.state.token ? (
                          <div>
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
                  severity={this.state.severity}
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
    const commentReq = {
      id: this.props.id,
      likes: this.props.likes,
    };

    if (this.state.clicked) {
      Axios.post(
        "/api/comments/unLike",
        commentReq
      ).then((res) => {
        this.props.callBack();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      Axios.post(
        "/api/comments/addLike",
        commentReq
      ).then((res) => {
        this.props.callBack();
      }).catch((err) => {
        console.log(err);
      });
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

import React, { Component } from "react";
import "../App.css";
import { Comment } from "semantic-ui-react";
import Axios from "axios";

export default class BlogComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      success: false,
      token: localStorage.getItem("auth-token"),
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/comments/blog/" + this.props.blogId)
      .then((response) => response.json())
      .then((res) => {
        this.setState({ comments: res.item, success: res.success });
      });
  }

  handleDelete = (e) => {
    console.log("Comment deleted: " + e);
    Axios.delete("http://localhost:8000/api/comments/" + e).catch((err) => {
      console.log(Error);
    });
    window.location.reload(false);
  };

  render() {
    return (
      <div>
        <Comment.Group>
          {this.state.comments.map((comment) => {
            return (
              <div className="flexDisplay">
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

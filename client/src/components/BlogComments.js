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
    };
  }

  componentDidMount() {
    console.log("Before axios");
    fetch("http://localhost:8000/api/comments/blog/5f71c425ec797250a88b4701")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ comments: res.item, success: res.success });
        console.log(this.state.comments);
        console.log(this.state.success);
      });
    console.log("After axios");
  }

  handleDelete = (e) => {
    console.log("Comment deleted: " + e);
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
                    </Comment.Metadata>
                    <Comment.Text>{comment.content}</Comment.Text>
                  </Comment.Content>
                </Comment>
                <p>&nbsp; &nbsp;</p>
                <button
                  className="deleteButton"
                  onClick={() => this.handleDelete(comment._id)}
                >
                  <i className="fas fa-times"></i>
                </button>
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
      console.log("Before Axios");
      Axios.post("http://localhost:8000/api/comments/addLike", commentReq);
      window.location.reload(false);
      console.log("After Axios");
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

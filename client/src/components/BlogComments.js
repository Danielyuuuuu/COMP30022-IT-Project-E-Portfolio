import React, { Component } from "react";
import "../App.css";
import { Comment } from "semantic-ui-react";

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

  render() {
    return (
      <div>
        <Comment.Group>
          {this.state.comments.map((comment) => {
            return (
              <Comment>
                <Comment.Avatar
                  as="a"
                  src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                />
                <Comment.Content>
                  <Comment.Author>{comment.publisher}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.date.slice(0, 10)}</div>
                    <div>
                      <LikeButton />
                    </div>
                    <div>5 Faves</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.content}</Comment.Text>
                </Comment.Content>
              </Comment>
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
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div onClick={this.handleClick}>
        <i className={this.state.clicked ? "fas fa-heart" : "far fa-heart"}></i>
      </div>
    );
  }
}

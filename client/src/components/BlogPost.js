import React, { Component } from "react";
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
} from "reactstrap";

class BlogPost extends Component {
  render() {
    return (
      <div className="posts">
        <CardGroup className="individualPost">
          <Card>
            <CardImg
              top
              width="100%"
              src="https://petapixel.com/assets/uploads/2019/11/Geert-Weggen_squirrel-wishes_00003677.jpg"
              alt="Card image cap"
            />
          </Card>
          <Card>
            <CardBody>
              <EllipsisButton />
              <CardTitle>
                <a href="/individualpost">Post title</a>
              </CardTitle>
              <CardText>
                This Post has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <LikeButton />
            </CardBody>
          </Card>
        </CardGroup>
        <CardGroup className="individualPost">
          <Card>
            <CardImg
              top
              width="100%"
              src="https://filmdaily.co/wp-content/uploads/2020/04/funny-animals-lede.jpg"
              alt="Card image cap"
            />
          </Card>
          <Card>
            <CardBody>
              <EllipsisButton />
              <CardTitle>
                <a href="/individualpost">Post title</a>
              </CardTitle>
              <CardText>
                This Post has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <LikeButton />
            </CardBody>
          </Card>
        </CardGroup>
        <CardGroup className="individualPost">
          <Card>
            <CardImg
              top
              width="100%"
              src="https://www.nikon.com.au/tmp/Asia/2419865273/3760176746/2586568015/286546384/152549275/210978916/542011102/2974987658/1834978357/200150890/2821987493.jpg"
              alt="Card image cap"
            />
          </Card>
          <Card>
            <CardBody>
              <EllipsisButton />
              <CardTitle>
                <a href="/individualpost">Post title</a>
              </CardTitle>
              <CardText>
                This Post has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <LikeButton />
            </CardBody>
          </Card>
        </CardGroup>
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
      <div className="blogEllipsis-v" onClick={this.handleClick}>
        <i
          className={this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"}
        ></i>
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

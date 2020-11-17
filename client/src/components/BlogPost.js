import React, { Component } from "react";
import {
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardBody,
} from "reactstrap";
import Card from "@material-ui/core/Card";

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPosts: [],
    };
  }

  componentDidMount() {
    fetch("/api/blog/getAllBlogs")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ blogPosts: res });
        this.setState({
          blogPosts: this.state.blogPosts.filter((blogPost) => blogPost.title !== "About Me"),
        })
      });
  }

  render() {
    return (
      <div className="posts">
        {this.state.blogPosts.map((blogPost) => {
          return (
            <CardGroup className="individualPost">
              <Card className="testNewCard">
                <CardImg
                  top
                  width={150}
                  src={blogPost.thumbnails.imagename}
                  alt="Thumbnails"
                />
              </Card>
              <Card className="testNewCard">
                <CardBody>
                  <CardTitle>
                    <a href={"/individualpost/" + blogPost._id}>
                      <h3>{blogPost.title}</h3>
                    </a>
                  </CardTitle>
                  <CardText>
                  {blogPost.content.replaceAll("#","").split(" ").splice(0, 80).join(" ") + "..."}
                  </CardText>
                  <div className="flexDisplay">
                    {blogPost.hashtags.map((hashtag) => {
                      return (
                        <div style={{ marginRight: 3 }}>
                          <Chip
                            icon={<LocalOfferIcon />} 
                            label={hashtag} 
                          />
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


export default BlogPost;

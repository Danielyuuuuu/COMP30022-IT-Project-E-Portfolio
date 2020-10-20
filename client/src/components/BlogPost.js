import React, { Component } from "react";
import {
  // Card,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardBody,
  Badge,
} from "reactstrap";
import Card from "@material-ui/core/Card";

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

let marked = require("marked");

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
                  {/* <EllipsisButton /> */}
                  <CardTitle>
                    <a href={"/individualpost/" + blogPost._id}>
                      <h3>{blogPost.title}</h3>
                    </a>
                  </CardTitle>
                  <CardText>
                  {blogPost.content.replaceAll("#","").split(" ").splice(0, 80).join(" ") + "..."}
                  {/* {blogPost.content.replaceAll("#","")} */}
                  {/* <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                      <Typography noWrap>{blogPost.content.replaceAll("#","")}</Typography>
                    </Grid>
                  </Grid> */}
                  </CardText>
                  <div className="flexDisplay">
                    {blogPost.hashtags.map((hashtag) => {
                      return (
                        <div style={{ marginRight: 3 }}>
                          <Chip
                            icon={<LocalOfferIcon />} 
                            label={hashtag} 
                            // style = {{backgroundColor: "#5792ff"}}
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
        {/* <Chip
          icon={<LocalOfferIcon />} 
          label="Lifestyle" 
        /> */}
      </div>
    );
  }
}

// class EllipsisButton extends Component {
//   constructor(props) {
//     super();

//     this.state = {
//       clicked: false,
//     };
//   }

//   handleClick = () => {
//     this.setState({ clicked: !this.state.clicked });
//   };

//   render() {
//     return (
//       <div>
//         <Dropdown
//           isOpen={this.state.clicked}
//           toggle={this.handleClick}
//           className="blogEllipsis-v"
//         >
//           <DropdownToggle>
//             <i
//               className={
//                 this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
//               }
//             ></i>
//           </DropdownToggle>
//           <DropdownMenu>
//             <DropdownItem>Share</DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </div>
//     );
//   }
// }

// class LikeButton extends Component {
//   constructor(props) {
//     super();

//     this.state = {
//       clicked: false,
//     };
//   }
//   handleClick = () => {
//     this.setState({ clicked: !this.state.clicked });
//   };

//   render() {
//     return (
//       <div className="blogHeart" onClick={this.handleClick}>
//         <i className={this.state.clicked ? "fas fa-heart" : "far fa-heart"}></i>
//       </div>
//     );
//   }
// }

export default BlogPost;

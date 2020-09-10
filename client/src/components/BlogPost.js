// import React, { Component, useState } from "react";
// import "../App.css";
// import {
//   Card,
//   Button,
//   CardTitle,
//   CardText,
//   CardImg,
//   Row,
//   Col,
//   CardFooter,
// } from "reactstrap";

// class BlogPost extends Component {
//   state = { clicked: false };

//   handleClick = () => {
//     this.setState({ clicked: !this.state.clicked });
//   };

//   render() {
//     return (
//       <div className="blog">
//         <div className="blogPost">
//           <div className="blogEllipsis-v" onClick={this.handleClick}>
//             <i
//               className={
//                 this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
//               }
//             ></i>
//           </div>
//           <div className="postImage">
//             <img src="https://petapixel.com/assets/uploads/2019/11/Geert-Weggen_squirrel-wishes_00003677.jpg" />
//           </div>
//           <div className="userIcon">
//             <i class="far fa-laugh-wink" />
//           </div>
//           <div className="blogText">
//             <h1 className="blogTitle">Blog Title</h1>
//             <h2 className="blogBody">Blog Text</h2>
//           </div>
//         </div>
//         <div className="blogPost">
//           <div className="blogEllipsis-v" onClick={this.handleClick}>
//             <i
//               className={
//                 this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
//               }
//             ></i>
//           </div>
//           <div className="postImage">
//             <img src="https://filmdaily.co/wp-content/uploads/2020/04/funny-animals-lede.jpg" />
//           </div>
//           <div className="blogText">
//             <h1 className="blogTitle">Blog Title</h1>
//             <h2 className="blogBody">Blog Text</h2>
//           </div>
//         </div>
//         <div className="blogPost">
//           <div className="blogEllipsis-v" onClick={this.handleClick}>
//             <i
//               className={
//                 this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
//               }
//             ></i>
//           </div>
//           <div className="postImage">
//             <img src="https://www.nikon.com.au/tmp/Asia/2419865273/3760176746/2586568015/286546384/152549275/210978916/542011102/2974987658/1834978357/200150890/2821987493.jpg" />
//           </div>
//           <div className="blogText">
//             <h1 className="blogTitle">Blog Title</h1>
//             <h2 className="blogBody">Blog Text</h2>
//           </div>
//         </div>
//         <div className="blogPost">
//           <div className="blogEllipsis-v" onClick={this.handleClick}>
//             <i
//               className={
//                 this.state.clicked ? "fas fa-times" : "fas fa-ellipsis-v"
//               }
//             ></i>
//           </div>
//           <div className="postImage">
//             <img src="https://ih1.redbubble.net/image.1105996056.5179/flat,750x1000,075,f.jpg" />
//           </div>
//           <div className="blogText">
//             <h1 className="blogTitle">Blog Title</h1>
//             <h2 className="blogBody">Blog Text</h2>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default BlogPost;

import React from "react";
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
const Example = (props) => {
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
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              This card has supporting text below as a natural lead-in to
              additional content.
            </CardText>
            <Button>Button</Button>
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
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              This card has supporting text below as a natural lead-in to
              additional content.
            </CardText>
            <Button>Button</Button>
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
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              This card has supporting text below as a natural lead-in to
              additional content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </CardGroup>
    </div>
  );
};

export default Example;

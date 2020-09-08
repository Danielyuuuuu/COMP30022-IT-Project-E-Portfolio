import React, { Component, useState } from "react";
import "../App.css";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Col,
  CardFooter,
} from "reactstrap";

class BlogPost extends Component {
  render() {
    return (
      <div className="blogPost">
        <div className="postImage">
          <img src="https://petapixel.com/assets/uploads/2019/11/Geert-Weggen_squirrel-wishes_00003677.jpg" />
        </div>
        <div className="blogText">
          <h1 className="blogTitle">Blog Title</h1>
          <h2>Blog Text</h2>
        </div>
      </div>
    );
  }
}

// class BlogPost extends Component {
//   render() {
//     return (
//       <div className="blogPost">
//         <Card body>
//           <CardImg
//             width="100%"
//             src="https://petapixel.com/assets/uploads/2019/11/Geert-Weggen_squirrel-wishes_00003677.jpg"
//             alt="Card image cap"
//           />
//           <CardTitle className="blogTitle">Blog Title</CardTitle>
//           <CardText className="blogTitle">Blog Text</CardText>
//         </Card>

//         <Card body>
//           <CardImg
//             width="100%"
//             src="https://filmdaily.co/wp-content/uploads/2020/04/funny-animals-lede.jpg"
//             alt="Card image cap"
//           />
//           <CardTitle className="blogTitle">Blog Title</CardTitle>
//           <CardText className="blogTitle">Blog Text</CardText>
//         </Card>

//         <Card body>
//           <CardImg
//             width="100%"
//             src="https://www.nikon.com.au/tmp/Asia/2419865273/3760176746/2586568015/286546384/152549275/210978916/542011102/2974987658/1834978357/200150890/2821987493.jpg"
//             alt="Card image cap"
//           />
//           <CardTitle className="blogTitle">Blog Title</CardTitle>
//           <CardText className="blogTitle">Blog Text</CardText>
//         </Card>

//         <Card body>
//           <CardImg
//             width="100%"
//             src="https://ih1.redbubble.net/image.1105996056.5179/flat,750x1000,075,f.jpg"
//             alt="Card image cap"
//           />
//           <CardTitle className="blogTitle">Blog Title</CardTitle>
//           <CardText className="blogTitle">Blog Text</CardText>
//         </Card>
//       </div>
//     );
//   }
// }

export default BlogPost;

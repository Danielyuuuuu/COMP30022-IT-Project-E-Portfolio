import React, { Component } from "react";
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
  CardLink,
} from "reactstrap";

const Example = (props) => {
  return (
    <div className="categories">
      <Card body>
        <CardLink href="/photographygallery">
          <CardImg
            width="100%"
            src="https://www.business.com/images/content/5ca/3d01e5a215e8a458b690f/0-800-"
            alt="Card image cap"
          />
          <CardFooter className="text-center">Photography</CardFooter>
        </CardLink>
      </Card>

      {/* <Card body>
        <CardLink href="/artworkgallery">
          <CardImg width="100%" src="https://static.dezeen.com/uploads/2019/12/logo-house-adidas-karina-wiciak_dezeen_2364_col_2.jpg" alt="Card image cap" />
          <CardFooter className="text-center">Architecture</CardFooter>
        </CardLink>
      </Card> */}

      <Card body>
        <CardLink href="https://en.wikipedia.org/wiki/Art">
          <CardImg
            width="100%"
            src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg"
            alt="Card image cap"
          />
          <CardFooter className="text-center">Art Crafts</CardFooter>
        </CardLink>
      </Card>

      <Card body>
        <CardLink href="/paintinggallery">
          <CardImg
            width="100%"
            src="https://wallpaperaccess.com/full/764272.jpg"
            alt="Card image cap"
          />
          <CardFooter className="text-center">Painting</CardFooter>
        </CardLink>
      </Card>

      {/* <Card body>
        <CardLink href="https://en.wikipedia.org/wiki/Film">
          <CardImg width="100%" src="https://sofy.tv/blog/wp-content/uploads/2020/01/filmmaking-production.jpg" alt="Card image cap" />
          <CardFooter className="text-center">Films</CardFooter>
        </CardLink> 
      </Card> */}

      <Card body>
        <CardLink href="https://en.wikipedia.org/wiki/Graphic">
          <CardImg
            width="100%"
            src="https://www.thecreativeissue.com.au/wp-content/uploads/2017/07/Beastman-3-TCI.jpg"
            alt="Card image cap"
          />
          <CardFooter className="text-center">Graphic Design</CardFooter>
        </CardLink>
      </Card>
    </div>
  );
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

class Category extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <div style={divStyle}>
          <Example />
        </div>
      </div>
    );
  }
}

export default Category;

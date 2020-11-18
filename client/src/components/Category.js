import React, { Component } from "react";
import {
  Card,
  CardFooter, CardImg,
  CardLink
} from "reactstrap";
import "../App.css";


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
          <CardFooter
            className={`josefinFont text-center`}
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Photography
          </CardFooter>
        </CardLink>
      </Card>

      <Card body>
        <CardLink href="/artcraftsgallery">
          <CardImg
            width="100%"
            src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg"
            alt="Card image cap"
          />
          <CardFooter
            className={`josefinFont text-center`}
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Art Crafts
          </CardFooter>
        </CardLink>
      </Card>

      <Card body>
        <CardLink href="/paintinggallery">
          <CardImg
            width="100%"
            src="https://wallpaperaccess.com/full/764272.jpg"
            //src="https://www.pixel4k.com/wp-content/uploads/2018/10/rainy-night-artistic-painting-4k_1540748496.jpg"

            alt="Card image cap"
          />
          <CardFooter
            className={`josefinFont text-center`}
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Painting
          </CardFooter>
        </CardLink>
      </Card>

      <Card body>
        <CardLink href="/graphicdesigngallery">
          <CardImg
            width="100%"
            src="https://www.thecreativeissue.com.au/wp-content/uploads/2017/07/Beastman-3-TCI.jpg"
            alt="Card image cap"
          />
          <CardFooter
            className={`josefinFont text-center`}
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Graphic Design
          </CardFooter>
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

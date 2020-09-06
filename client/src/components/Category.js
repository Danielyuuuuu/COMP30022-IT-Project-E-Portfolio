
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";



import { Card, Button, CardTitle, CardText, CardImg, Row, Col, CardFooter } from 'reactstrap';

const Example = (props) => {
  return (
    <div>
    <Row>
      <Col sm="4">
        <Card body>
            <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
            <CardFooter className="text-center">Graphic Design</CardFooter>
        </Card>
      </Col>

      <Col sm="4">
        <Card body>
        <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
        <CardFooter className="text-center">Photography</CardFooter>
        </Card>
      </Col>

      <Col sm="4">
        <Card body>
        <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
        <CardFooter className="text-center">Art Product</CardFooter>
        </Card>
      </Col>

    </Row>
    <br />
    <br />
    <br />
    <Row>
    <Col sm="4">
      <Card body>
          <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
          <CardFooter className="text-center">Painting</CardFooter>
      </Card>
    </Col>

    <Col sm="4">
      <Card body>
      <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
      <CardFooter className="text-center">Films</CardFooter>
      </Card>
    </Col>

    <Col sm="4">
      <Card body>
      <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
      <CardFooter className="text-center">Architecture</CardFooter>
      </Card>
    </Col>

    </Row>

  </div>

  );
};

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };


class Category extends Component{
    render(){
        return(
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
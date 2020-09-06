
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import StoreCategoryList from "./StoreCategoryList";

import "../App.css";



import { Card, Button, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap';

const Example = (props) => {
  return (
    <Row>
      <Col sm="3">
        <Card body>
            <CardImg width="100%" src="https://kottke.org/plus/misc/images/art-institute-chi-01.jpg" alt="Card image cap" />
          <CardTitle>Art product  $5.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>
      </Col>

      <Col sm="3">
        <Card body>
        <CardImg width="100%" src="https://www.fineartbyhelenreimer.com/images/intercessory-worship-high-res.jpg" alt="Card image cap" />
          <CardTitle>Painting  $7.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>
        
      </Col>
    </Row>

        

  );
};

const divStyle = {
  };


class Store extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                <br />
                <br />
                <br />
                <StoreCategoryList />
                <br />
                <div style={divStyle}>
                    <Example />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default Store;
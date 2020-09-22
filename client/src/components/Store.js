
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import StoreCategoryList from "./StoreCategoryList";
import Footer from "./Footer";
import "../App.css";



import { Card, Button, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap';

const Example = (props) => {
  return (
    <div>
        <Card body
        >
            <CardImg width="100%" src="http://localhost:8000/store/image/95cfca7eca5b211f965658de9244165a.png" alt="Card image cap" />
          <CardTitle>Art product  $5.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
        <CardImg width="100%" src="https://www.fineartbyhelenreimer.com/images/intercessory-worship-high-res.jpg" alt="Card image cap" />
          <CardTitle>Painting  $7.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
            <CardImg width="100%" src="https://www.montmarte.net/assets/Uploads/_resampled/FillWyI5MDAiLCI1MDAiXQ/Leonid-Afremov-inspired-painting-1.jpg" alt="Card image cap" />
          <CardTitle>Painting  $10.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

        <Card body>
        <CardImg width="100%" src="https://redballoon.com.au/dw/image/v2/BCRD_PRD/on/demandware.static/-/Sites-rb-au-catalog/default/images/products/PWA014-M/hhaubjsf4lbthjnsmfjs.jpg?sw=784&sh=431&q=70" alt="Card image cap" />
          <CardTitle>Photography  $3.00</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Buy now</Button>
        </Card>

    </div> 

        

  );
};

class Store extends Component{
    render(){
        return(
            <div>
                <NavbarTop />
                
                <div className="store">
                  <div className="store-menu">
                    <StoreCategoryList />
                  </div>
                  <div className="store-items">
                    <Example />
                  </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Store;
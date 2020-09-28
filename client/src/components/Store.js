
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import StoreCategoryList from "./StoreCategoryList";
import Footer from "./Footer";
import "../App.css";



import { Card, Button, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap';

/*
const StoreItems = (props) => {
  return (
    <div>
        <Card body
        >
            <CardImg width="100%" src="http://localhost:8000/api/store/image/af53b98e05f7845bd201ac73fcb3dd8f.png" alt="Card image cap" />
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
*/

const data = [{
	id: 2,
  name: "Forest",
  price: "3",
  description: "Amazing!!!",
  image: "https://images.unsplash.com/photo-1468851508491-4f854ec88aa0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=b1222b6a1d3694cac76d2a23c3a02254"
}, {
  id: 4,
  price: "4",
  description: "Amazing!!!",
	name: "Mountain",
	image: "https://images.unsplash.com/photo-1467890947394-8171244e5410?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=9396f0adf263b51b44626228225684d0"
}, {
	id: 5,
  name: "Boat",
  price: "35",
  description: "Amazing!!!",
	image: "https://images.unsplash.com/photo-1443302382600-0bfacc473376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=980&h=980&fit=crop&s=0c0f26518c1001f67b6c2e4480a8d3e0"
}, {
	id: 6,
  name: "Flowers",
  price: "6",
  description: "Amazing!!!",
	image: "https://images.unsplash.com/photo-1429091443922-e7d9ae79a837?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=900&h=900&fit=crop&s=e81cb6a60c53788559edb9bec21b80fc"
}

];

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
                  <StoreItems data={data}/>
                </div>
              </div>
              <Footer />
          </div>
      );
  }
}

class StoreItems extends React.Component {
	render() {
		return (
            <div>
			    <Items data={this.props.data} />
            </div>
		);
	}
}

class Items extends Component{
  render(){
    return(
      <div className="store-items-flexible">
				{this.props.data.map((data) => {
					return <Item data={data} key={data.id} />
				})}
			</div>
    );
  }
}

class Item extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Card body className="store-itemCard">
        <CardImg src={this.props.data.image} alt={this.props.data.name} />
        <br />
    <CardTitle>{this.props.data.name}  </CardTitle>
    <CardText>{this.props.data.description}</CardText>
    <CardTitle>${this.props.data.price}.00</CardTitle>
    
          <Button>Buy now</Button>
        </Card>
    );
  }
}



export default Store;
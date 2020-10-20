import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardGroup,
    CardBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
  } from "reactstrap";

  export default class ShoppingSuccess extends Component{
    constructor(props){
        super(props);
        this.state = {
            myCart: JSON.parse(localStorage.getItem("cart")),
        };
    }

    render() {
      return (
        <div>
          <br />
          <br />
          <h1> Your Payment have been Approval !</h1>
          <br />
          <br />
          <div>
              <ItemList body = {this.state.myCart}/>
          </div>


        </div>  
      )
    }
  }


class ItemList extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: this.props.body
        };
    }

    render () {
        let itemstyle = {
            width: "18vw",
            top : "",
            left:"30"
            //height:"18vw"
        };
        return (
            <div className=" card-deck">
                {this.state.items.map((item) => {
                    return (
                       <Card>
                           <CardImg 
                              top
                              style={itemstyle}
                              src={"http://localhost:8000/api/uploadManage/image/"+item.filename} 
                              alt="Card image cap" 
                                
                            />
                           <CardBody>
                              <CardTitle>{item.name}</CardTitle>
                              <CardText> {item.quantity}</CardText>
                              <CardText>{item.price*item.quantity}({item.price + "for each"})</CardText>
                            </CardBody>
                       </Card> 
                    )
                })}
            </div>
        )
    }
}
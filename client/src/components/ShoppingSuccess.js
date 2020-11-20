import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import React, { Component } from "react";
import {
  Alert
} from "reactstrap";


  
  
  export default class ShoppingSuccess extends Component{
    constructor(props){
        super(props);
        this.state = {
            myCart: JSON.parse(localStorage.getItem("cart")),
        };
    }
    
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
            localStorage.removeItem("cart");
            window.location.href= "http://e-portfolio-website.herokuapp.com";
        }, 5000);

      
   }

   componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }


    render() {


      return (
        <div>
          <br />
          <br />
          <Alert color="success" >
            <span >
            
            <font size={5} ><CheckCircleOutlineIcon style={{ fontSize: 25 }}/> Success!</font> 
            <font size={5}>Your Payment have been Approval !</font>
            <font size = {3}> This page will redirect to home page in 5 seconds...</font>
            </span>
          </Alert>
          
          <br />
          <br />
        </div>  
      )
    }
  }


// class ItemList extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             items: this.props.body
//         };
//     }

//     render () {


//         let itemstyle = {
//             maxWidth: "18vw",
//             maxHeight:"18vw"
//         };
//         return (
//             <div className=" card-deck">
//                 {this.state.items.map((item) => {
//                     return (
//                        <Card>
//                            <CardImg 
                            
//                               object-fit="contain"
//                               top
//                               style={itemstyle}
//                               src={"/api/uploadManage/image/"+item.filename} 
//                               alt="Card image cap" 
                                
//                             />
//                            <CardBody>
//                               <CardTitle>{item.name}</CardTitle>
//                               <CardText> {item.quantity}</CardText>
//                               <CardText>{item.price*item.quantity}({item.price + "for each"})</CardText>
//                             </CardBody>
//                        </Card> 
//                     )
//                 })}
//             </div>
//         )
//     }
// }
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import React, { Component } from "react";
import {
  Alert
} from "reactstrap";


  export default class ShoppingSuccess extends Component{
    constructor(props){
        super(props);
        this.state = {
           
        };
    }
    
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
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
          <Alert color="warning" >
            <span >
            
            <font size={5} ><SentimentVeryDissatisfiedIcon style={{ fontSize: 25 }}/> Ah..!</font> 
            <font size={5}>Your Payment have been Cancelled !</font>
            <font size = {3}> This page will redirect to home page in 5 seconds...</font>
            </span>
          </Alert>
          
          <br />
          <br />
        </div>  
      )
    }
  }
import React, { Component } from "react";
import NavbarTop from "./NavbarTop";
import "../App.css";
import Footer from "./Footer";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Media,
} from "reactstrap";
import { Comment, Icon, Header } from "semantic-ui-react";
import axios from 'axios' ;

export default class CommentsList extends Component{
  constructor(props){
    super(props)
    this.state ={
      comments: []
    }
       
  }

  getComments(){
    axios.get('http://localhost:8000/api/comments/blog/5f703c3b07005138f07a2107')
    .then(res => this.setState({ comments : res.data}))
    .catch(err => console.log(err))
  console.log(this.state);
  }

  commentList() {  
    return this.state.comments.map(currentcomment => {
      return <Comment comment={currentcomment} socket={this.props.actions} key={currentcomment._id}/>;
    })
  }

  render() {
    return (
      <div className="d-flex flex-column">
      <h3>Comments</h3>
        { this.commentList() }
     </div>
    );
  }
  

}
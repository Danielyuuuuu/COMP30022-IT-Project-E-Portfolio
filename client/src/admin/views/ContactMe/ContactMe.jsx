import React, { Component } from "react";
import { Comment } from "semantic-ui-react";
import Axios from "axios";
import "../../../App.css";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default class ContactMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactMes: [],
      expanded: "false",
    };
  }

  handleExpandClick = async () =>{
    this.setState({expanded: !this.state.expanded});
  }

  componentDidMount() {
    this.fetchAllTheContactMeMessages();
  }

  fetchAllTheContactMeMessages = async () => {
    fetch("http://localhost:8000/api/contactMe/getContactMe")
      .then((response) => response.json())
      .then((res) => {
        this.setState({ contactMes: res });
      });
  };

  handleDelete = (e) => {
    console.log("ContactMe deleted: " + e);
    Axios.delete("http://localhost:8000/api/contactMe/deleteContactMe/" + e)
      .then((res) => {
        this.fetchAllTheContactMeMessages();
        console.log("fetchAllTheContactMeMessages");
      })
      .catch((err) => {
        console.log(Error);
      });
  };

  render() {
    return (
      <div>
          {this.state.contactMes.map((contactMe) => {
            return (
              <div>
                <ContactMeBlock profilePhoto={contactMe.profilePhoto} name={contactMe.name} date={contactMe.date.slice(0, 10)} email={contactMe.email} subject={contactMe.subject} message={contactMe.message} id={contactMe._id} callBack={this.fetchAllTheContactMeMessages}/>
              </div>
            );
          })}
      </div>
    );
  }
}

class ContactMeBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "false",
    };
  }

  handleExpandClick = async () =>{
    this.setState({expanded: !this.state.expanded});
  }

  handleDelete = (e) => {
    console.log("ContactMe deleted: " + e);
    Axios.delete("http://localhost:8000/api/contactMe/deleteContactMe/" + e)
      .then((res) => {
        this.props.callBack();
        console.log("fetchAllTheContactMeMessages");
      })
      .catch((err) => {
        console.log(Error);
      });
  };

  render(){
    return(
      <div>
        <Card className="displayContactMe">
          <CardHeader
            avatar={
              <Avatar as="a" src={this.props.profilePhoto} />
            }
            action={
              <div>
              <button
                className="deleteButton"
                onClick={() => this.handleDelete(this.props.id)}
              >
                <i className="fas fa-times"></i>
              </button>{" "}
            </div>
            }
            title={this.props.name}
            subheader={this.props.date}
          />
          <CardActions disableSpacing className={this.state.expanded ? ("expandArrow") : ("expandedArrow")}>
            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.props.subject}
            </Typography>
          </CardContent>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{this.props.message}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}
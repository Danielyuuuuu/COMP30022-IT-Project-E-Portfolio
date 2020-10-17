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

  // classes = makeStyles((theme) => ({
  //   root: {
  //     maxWidth: 200,
  //   },
  //   media: {
  //     height: 0,
  //     paddingTop: '56.25%', // 16:9
  //   },
  //   expand: {
  //     transform: 'rotate(0deg)',
  //     marginLeft: 'auto',
  //     transition: theme.transitions.create('transform', {
  //       duration: theme.transitions.duration.shortest,
  //     }),
  //   },
  //   expandOpen: {
  //     transform: 'rotate(180deg)',
  //   },
  //   avatar: {
  //     backgroundColor: red[500],
  //   },
  // }));

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
        <Comment.Group size="massive">
          {this.state.contactMes.map((contactMe) => {
            return (
              <div className="flexDisplay">
                <Comment>
                  <Comment.Avatar as="a" src={contactMe.profilePhoto} />
                  <Comment.Content>
                    <Comment.Author as="a">{contactMe.name}</Comment.Author>
                    <Comment.Metadata className="floatRight">
                      <div>
                        {/* <p>&nbsp; &nbsp;</p> */}
                        <button
                          className="deleteButton"
                          onClick={() => this.handleDelete(contactMe._id)}
                        >
                          <i className="fas fa-times"></i>
                        </button>{" "}
                      </div>
                    </Comment.Metadata>
                    <Comment.Metadata>
                      <div>{contactMe.date.slice(0, 10)}</div>
                    </Comment.Metadata>
                    <Comment.Text>
                      <div>Email: {contactMe.email}</div>
                      <div>Subject: {contactMe.subject}</div>
                      <div>Message: {contactMe.message}</div>
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </div>
            );
          })}
        </Comment.Group>
        <Card className="displayContactMe">
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <CardActions disableSpacing className="expandArrow">
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              </CardActions>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>text!!!!!!!!!!!!!!!!!!</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

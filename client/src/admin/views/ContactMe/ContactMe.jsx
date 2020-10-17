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

  classes = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

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
        <Card className={this.classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={this.classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
          />
          <CardMedia
            className={this.classes.media}
            image="/static/images/cards/paella.jpg"
            title="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(this.classes.expand, {
                [this.classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                again without stirring, until mussels have opened and rice is just tender, 5 to 7
                minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

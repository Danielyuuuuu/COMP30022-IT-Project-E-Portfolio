
import React from "react";
import { useState } from "react";
// import { makeStyles } from '@material-ui/core/styles';

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PostList from "../../components/PostList/PostList";
import { Button } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import Axios from "axios";

// for post list
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

let marked = require("marked");

const options = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
  
    },
    postList: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

function generate(element) {
    return [0, 1, 2, 4].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

export default function Post() {
  const [markdown, setMarkDown] = useState("");
  const [tag, setTags] = React.useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const history = useHistory();

  const classes = useStyles();
  const [dense, setDense] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const newPost = {
      postTitle: title,
      imageUrl: imageUrl,
      postBody: markdown,
      hashTags: tag,
    };
    const postRes = await Axios.post(
      "http://localhost:8000/api/blog/uploadblog",
      newPost
    );
    console.log("successful................");
    history.push("/admin/dashboard");
  };
  const [textPost, setTextPost] = useState("New Post");
  return (
    <div>
      <div className={classes.root}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" className={classes.title}>
                Post List
                </Typography>
                <div className={classes.postList}>
                <List dense={dense}>
                    {generate(
                    <ListItem onClick={(e) => setTextPost("Edit this Post")}>
                        <ListItemText
                        primary="Single-line item"
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>,
                    )}
                </List>
                </div>
            </Grid>
      </div>

      <h3>{textPost}</h3>
      <div>
        <TextField
          id="Post Title"
          name="Post Title"
          label="Post Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <TextField
          id="Image Url"
          name="Image Url"
          label="Image Url"
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Autocomplete
        multiple
        value={tag}
        onChange={(event, newValue) => {
          setTags(newValue);
        }}
        id="controllable-states-demo"
        options={options}
        defaultValue={[options[0]]}
        renderInput={(params) => (
          <TextField {...params} label="Controllable" variant="outlined" />
        )}
      />
      <Grid
        container
        spacing={2}
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item xs={6}>
          <TextField
            id="filled-multiline-static"
            label="Post Content"
            multiline
            fullWidth
            rows={40}
            defaultValue="Default Value"
            variant="filled"
            value={markdown}
            onChange={(event) => setMarkDown(event.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={submit}
      >
        Submit!
      </Button>
    </div>
  );
}


import React from "react";
// import { makeStyles } from '@material-ui/core/styles';

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { Component } from "react";

import PostList from "../../components/PostList/PostList";

let marked = require("marked");

class Post extends Component {
  state = {
    markdown: "",
  };

  updateMarkdown = function (markdown) {
    this.setState({ markdown });
  };

  render() {
    let { markdown } = this.state;

    return (
      <div>
        <PostList />
        <h3>Edit the Post</h3>
        <div>
          <TextField required id="standard-required1" label="Post Title" />
        </div>

        <div>
          <TextField required id="standard-require2" label="Image Url" />
        </div>
        <div>
          <TextField required id="standard-require2" label="Hash Tag" />
        </div>
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
              onChange={(event) => this.updateMarkdown(event.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" disableElevation>
          Submit!
        </Button>
      </div>
    );
  }
}
export default Post;

import React from 'react';
import {useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PostList from "../../components/PostList/PostList"


let marked = require("marked");

const options = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];

export default function Post(){


    const [markdown, setMarkDown] = useState("");
    const [tag, setTags] = React.useState([]);

    return (
            <div>
                
                <PostList/>
                
                <h3>Edit the Post</h3>
                <div>
                    <TextField required id="standard-required1" label="Post Title"/>
                </div>
                
                
                <div>
                    <TextField required id="standard-require2" label="Image Url" />
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
                        <TextField {...params} 
                        label="Controllable" 
                        variant="outlined" />)
                    }
                />
                <Grid 
                    
                    container spacing={2} 
                    direction="row" 
                    justify="space-around" 
                    alignItems="stretch">

                    <Grid item xs={6}>
                        <TextField
                            id="filled-multiline-static"
                            label="Post Content"
                            multiline
                            fullWidth
                            rows={40}
                            defaultValue="Default Value"
                            variant="filled"
                            value = {markdown}
                            onChange = {(event)=>setMarkDown(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <div dangerouslySetInnerHTML = {{__html: marked(markdown)}}>
                        </div>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" disableElevation>
                    Submit!
                </Button>
            </div>
    )
}


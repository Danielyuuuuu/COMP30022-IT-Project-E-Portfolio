import React from 'react';
import {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import DropzoneArea from '../../components/DropzoneArea';

import axios from "axios"
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    
  },
  icon: {
      color: 'rgba(255, 255, 255, 0.54)'
  },

  control: {
    padding: theme.spacing(2),
  },

  gridList: {
    height: '800px',
    width: '100%',
  },

  paper: {
    height: '100%',
    width: '100%',
  }

}));



export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const [copyOpen, setCopyOpen] = React.useState(false);

  const handleCopyClick = () => {
        setCopyOpen(true);
  }

  const handleCopyClose = (event, reason) => {
      if (reason === 'clickaway'){
          return;
      }
      setCopyOpen(false);
  }

  const [images, setImages] = useState([]);
  

    useEffect(() => {
          // Read the mutable latest value
          console.log(`Getting files...`);
        
        axios
        .get("http://localhost:8000/api/uploadManage/files")
        .then((res) => {
            setImages(res.data);
        })
        .catch((err) => {
            console.log("Error from ShowBookList");
        });
      },[]);

//   const images = [
//       {
//           author: "abc"
//       }
//   ]
    const history = useHistory();
  return (
    <div>
        <Grid container spacing={2} direction="row" justify="space-around" alignItems="stretch">

            <Grid item xs={8} className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <h3>Media</h3>
                    <GridList cellHeight={180} className={classes.gridList} cols={3}>
                        {images.map((tile) => (
                        <GridListTile>
                            <img src={"http://localhost:8000/api/uploadManage/image/"+tile.filename} />
                            <GridListTileBar
                                actionIcon={
                                    <div>
                                    <IconButton className={classes.icon} onClick={() => {navigator.clipboard.writeText("http://localhost:8000/api/uploadManage/image/"+tile.filename)}}>
                                        <FileCopyOutlinedIcon onClick={handleCopyClick}/>
                                    </IconButton>
                                    <IconButton className={classes.icon} onClick={() => {axios.delete("http://localhost:8000/api/uploadManage/files/"+tile._id);history.go(0);}}>
                                        <HighlightOffOutlinedIcon/>
                                    </IconButton>
                                    </div>
                                }
                                />
                        </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Grid>

            <Grid item xs={4} className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <h3>Informations</h3>
                    <p>File Name:</p>
                    <p>Describe:</p>
                    <p>URL:</p>
                    <DropzoneArea />
                </Paper>
            </Grid>

        </Grid>
        <Snackbar open={copyOpen} autoHideDuration={2000} onClose={handleCopyClose}>
        <Alert onClose={handleCopyClose} severity="success">
          You have already copy the url of image.
        </Alert>
      </Snackbar>     
                         
    </div>
  );
}

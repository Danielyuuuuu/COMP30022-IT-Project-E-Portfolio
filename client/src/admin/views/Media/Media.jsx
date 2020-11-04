import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from "notistack"
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from "@material-ui/core/IconButton";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";

import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

import DropzoneArea from "../../components/DropzoneArea";

import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },

  control: {
    padding: theme.spacing(2),
  },

  gridList: {
    height: "800px",
    width: "100%",
  },

  paper: {
    height: "100%",
    width: "100%",
  },
}));


// function MyApp() {
//   const { enqueueSnackbar } = useSnackbar();

//   const handleClick = () => {
//     enqueueSnackbar('I love snacks.');
//   };

//   const handleClickVariant = (variant) => () => {
//     // variant could be success, error, warning, info, or default
//     enqueueSnackbar('This is a success message!', { variant });
//   };

//   return (
//     <React.Fragment>
//       <Button onClick={handleClick}>Show snackbar</Button>
//       <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
//     </React.Fragment>
//   );
// }


function Media() {
  const classes = useStyles();
  const [copyOpen, setCopyOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, { variant })
  }

  const handleCopyClick = () => {
    handleClickVariant("You have copy the url of image", "success");
    // setCopyOpen(true);
  };

  const [images, setImages] = useState([]);

  const handleRemoveItem = (filename) => {
    setDeleteOpen(true);
    handleClickVariant(`You have delete the image: ${filename} !`, 'warning');
    axios
      .delete(`/api/uploadManage/files/${filename}`)
      .then((res) => {
        console.log(res);
        setImages(images.filter(image => image.filename !== filename));

      });
  };

  const fetchAllImages = async () => {
    axios
      .get("/api/uploadManage/files")
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchAllImages();
  })

  const history = useHistory();
  return (
    <React.Fragment>

          <Paper elevation={0} className={classes.paper}>
            <Grid container spacing={2} direction="row" justify="space-around" alignItems="stretch">
              <Grid item xs={8}>
                <h3>Media</h3>
              </Grid>
              <Grid item xs={2}>
                <DropzoneArea callBack={fetchAllImages} />
              </Grid>
            </Grid>
            <GridList cellHeight={180} className={classes.gridList} cols={5}>
              {images.map((tile) => (
                <GridListTile>
                  <img src={"/api/uploadManage/image/" + tile.filename} />
                  <GridListTileBar
                    title={tile.filename}
                    actionIcon={
                      <Grid container direction="row" justify="space-around" alignItems="stretch">
                        <Grid item xs={6}>
                          <IconButton className={classes.icon} onClick={() => { navigator.clipboard.writeText("/api/uploadManage/image/" + tile.filename) }}>
                            <FileCopyOutlinedIcon onClick={handleCopyClick} />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton className={classes.icon} onClick={() => handleRemoveItem(tile.filename)}>
                            <HighlightOffOutlinedIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Paper>
    </ React.Fragment>
  )
}

export default function MediaWithSnackBar() {

  return (
    <SnackbarProvider maxSnack={3}>
      <Media />
    </SnackbarProvider>
  );
}

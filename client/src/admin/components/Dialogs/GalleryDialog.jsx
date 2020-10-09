import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useHistory } from 'react-router-dom';
import { SelectedPictures } from "../../components/MediaOptionBar/SharedVar";
import MediaOptionBar from "../../components/MediaOptionBar/MediaOptionBar";

const testData = [
  {
    chunkSize: 261120,
    contentType: "image/jpeg",
    filename: "cc33d33dc1c350d8a8e19d05bf8b4918.jpg",
    length: 69725,
    md5: "acb69f673e0874cefe8fd80f4ff284fa",
    uploadDate: "2020-09-23T08:07:06.010Z",
    _id: "5f6b022967817e238476fad6",
  },
  {
    chunkSize: 261120,
    contentType: "image/png",
    filename: "6b19db93e5940aa1bce15d564047c868.png",
    length: 138841,
    md5: "2d874793cea5e7825e34c26c30a98ecb",
    uploadDate: "2020-09-27T12:36:08.109Z",
    _id: "5f708737f697517cf02d4bc3",
  },
];
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DialogsOfStore(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedPictures, setPictures] = React.useState([]);

  const [defaultImages,setDefaultImages] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setPictures(defaultImages);
    setOpen(false);
  };

  const history = useHistory();

  const handleSubmit = () => {
    console.log("before post......");
    const data = {
      category:props.category,
      subcategory:props.subcategory,
      images:selectedPictures,
    };

    axios.post("http://localhost:8000/api/gallery/", data)
      .then(console.log("add/change galley......"))
      .then((res) => {
        console.log(res);
      });

    setOpen(false);

  };


  React.useEffect(() => {
    // Load the current subcategory
    console.log(`Getting imagenames by subcategory...`);

    const body = {
      category: props.category,
      subcategory: props.subcategory,
    }
    axios
      .post("http://localhost:8000/api/gallery/subcategory", body)
      .then((res) => {
        setPictures(res.data.artworks[0].imagenames);
        setDefaultImages(res.data.artworks[0].imagenames)
        console.log(res.data.artworks[0].imagenames);
      })
      .catch((err) => {
        console.log("Error from getting all gallery informations");
      });
  }, []);


  return (
    <div>
      <Button
        variant={props.variant}
        color={props.color}
        onClick={handleClickOpen}
        startIcon={<EditOutlinedIcon />}
      >
        {props.mode}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.mode + "  Item"}
        </DialogTitle>
        <DialogContent dividers>
          <SelectedPictures.Provider value={{ selectedPictures, setPictures }}>
            <MediaOptionBar></MediaOptionBar>
          </SelectedPictures.Provider>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleSubmit}
            color="primary">
            {props.mode}
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
}

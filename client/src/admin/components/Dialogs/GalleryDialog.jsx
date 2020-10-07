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

import Axios from "axios";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useHistory } from 'react-router-dom';
import { SelectedPictures } from "../../components/MediaOptionBar/SharedVar";
import MediaOptionBar from "../../components/MediaOptionBar/MediaOptionBar";

const testData = [
  {
    filename: "cc33d33dc1c350d8a8e19d05bf8b4918.jpg",
  },
  {
    filename: "cc33d33dc1c350d8a8e19d05bf8b4918.jpg",
  }
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

const imgStyles = makeStyles({
  img: {
    width: 160,
    height: 90,
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
  const [openJ, setOpenJ] = React.useState(false);
  const classes = imgStyles();
  const [selectedPictures, setPictures] = React.useState(testData);
  const [itemname, setItemName] = React.useState(props.item.itemname);
  const [category, setCategory] = React.useState(props.item.tag);
  const [categoryInput, setCategoryInput] = React.useState(props.item.tag);
  const [stocks, setStocks] = React.useState(props.item.stocks);
  const [price, setPrice] = React.useState(props.item.price);
  const [views, setViews] = React.useState(props.item.views);
  const [imagename, setImageName] = React.useState(props.item.imagename);
  const [description, setDescription] = React.useState(props.item.description);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();

  const handleSubmit = () => {
    console.log("before post......");
    const data = {
      name: itemname,
      description: description,
      filename: imagename,
      stocks: stocks,
      price: price,
      tag: category,
      views: views,
    };
    if (props.mode == "New") {
      Axios.post("http://localhost:8000/api/store/", data)
        .then(console.log("add new......"))
        .then((res) => {
          console.log(res);
        });
    } else {
      Axios.put(
        "http://localhost:8000/api/store/update/" + props.item._id,
        data
      )
        .then(console.log("edit item......"))
        .then((res) => {
          console.log(res);
        });
    }

    setOpen(false);
    history.go(0);
  };


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
          <Button autoFocus onClick={handleSubmit} color="primary">
            {props.mode}
          </Button>

        </DialogActions>
      </Dialog>

    </div>
  );
}

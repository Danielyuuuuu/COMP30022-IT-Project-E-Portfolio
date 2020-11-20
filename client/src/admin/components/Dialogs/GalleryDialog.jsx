import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import React from "react";
import MediaOptionBar from "../../components/MediaOptionBar/MediaOptionBar";
import { SelectedPictures } from "../../components/MediaOptionBar/SharedVar";


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




function GalleryDialog(propss) {
  const props = propss.props;
  const { enqueueSnackbar } = useSnackbar();

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
  const handleSubmit = () => {
    console.log("before post......");
    const data = {
      category:props.category,
      subcategory:props.subcategory,
      images:selectedPictures,
    };

    axios.post("/api/gallery/", data)
      .then(console.log("add/change galley......"))
      .then((res) => {
        console.log(res);
      });

    var variant = "success";
    enqueueSnackbar("You have change the content of sub category!", { variant});
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
      .post("/api/gallery/subcategory", body)
      .then((res) => {
        setPictures(res.data.artworks[0].imagenames);
        setDefaultImages(res.data.artworks[0].imagenames)
        console.log(res.data.artworks[0].imagenames);
      })
      .catch((err) => {
        console.log("Error from getting all gallery informations");
      });
  },[]);


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


export default function GalleryDialogWith(props){
  return (
    <SnackbarProvider maxSnack={3}>
      <GalleryDialog props={props}/>
    </SnackbarProvider>
  );
}
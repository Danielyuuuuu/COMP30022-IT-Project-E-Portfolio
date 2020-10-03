import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Axios from "axios";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import { useHistory } from 'react-router-dom';


const categories = ["graphic", "photography", "painting"];

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

  const handleClickOpenJ = () => {
    setOpenJ(true);
  };
  const handleCloseJ = () => {
    setOpenJ(false);
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
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    required
                    id="standard-required"
                    label="Item Name"
                    value={itemname}
                    onChange={(event) => setItemName(event.target.value)}
                    // defaultValue={props.item.itemname}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    id="standard-required"
                    label="Stock"
                    onChange={(event) => setStocks(event.target.value)}
                    // defaultValue={props.item.price}
                    value={stocks}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    id="standard-required"
                    label="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    // defaultValue={props.item.price}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    required
                    id="standard-required"
                    label="Views"
                    value={views}
                    onChange={(event) => setViews(event.target.value)}
                    // defaultValue={props.item.views}
                    onClick={handleClickOpenJ}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table>
            <TableHead>
              <TableCell>
                <TextField
                  required
                  id="standard-required"
                  label="Image Name"
                  value={imagename}
                  style={{ width: 300 }}
                  onChange={(event) => setImageName(event.target.value)}
                  // defaultValue={props.item.imagename}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                <Card className={classes.img}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.img}
                      image={
                        "http://localhost:8000/api/uploadManage/image/" +
                        imagename
                      }
                    />
                  </CardActionArea>
                </Card>
              </TableCell>
            </TableHead>
          </Table>
          <Table>
            <TableHead>
              <TableCell>
                
                <Autocomplete
                  value={category}
                  onChange={(event, newValue) => {
                    setCategory(newValue);
                  }}
                  inputValue={categoryInput}
                  onInputChange={(event, newInputValue) => {
                    setCategoryInput(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={categories}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  value={description}
                  // defaultValue={props.item.description}
                  variant="outlined"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </TableCell>
            </TableHead>
          </Table>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="primary">
            {props.mode}
          </Button>
          
        </DialogActions>
      </Dialog>

      <Dialog
        open={openJ}
        onClose={handleCloseJ}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you trying to change the views?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h1>???????????</h1>
            <img src={"http://localhost:8000/api/uploadManage/image/7b3c802ea99be25d56eb36fe2619fd37.png"}></img>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJ} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCloseJ} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

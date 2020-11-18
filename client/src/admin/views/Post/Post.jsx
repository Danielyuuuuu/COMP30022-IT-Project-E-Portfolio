import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dialogs from "../../components/Dialogs/PostDialog";



// import Joke from "../../components/Joke"
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  img: {
    width: 160,
    height: 90,
  },
});

function Row(props) {
  
  const { enqueueSnackbar } = useSnackbar();
  const notification = (message, variant) =>{
    enqueueSnackbar(message, {variant});
  }
  const history = useHistory();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [openDeleteAlert, setDeleteAlert] = React.useState(false);

  const handleDelete = (id) => {
    notification(`You have delete the item !`, "warning");
    axios
      .delete("/api/blog/deleteBlog/" + id)
      .then(console.log("delete item......"))
      .then((res) => {
        console.log(res);
        props.callBackRefresh();
      });
    handleCloseDeleteAlert();
  };
  const handleClickDeleteAlert = () => {
    setDeleteAlert(true);
  };
  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
  };
  const callBack=()=>{
    props.callBackRefresh();
  }

  return (
    <React.Fragment>
      <Dialog
        open={openDeleteAlert}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you trying to delete this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you agree, you cant make it back!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteAlert} color="primary">
            Disagree
          </Button>
          <Button
            onClick={(e) => {
              handleDelete(row._id);
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <h4>{row.title}</h4>
        </TableCell>
        <TableCell align="right">
          {row.hashtags.map((tag)=>(
            <div>{tag}</div>
          ))}
        </TableCell>
        {/* <TableCell align="right">{row.stocks}</TableCell> */}
        {/* <TableCell align="right">{row.price}</TableCell> */}
        
        <TableCell align="right">
          <Dialogs
            mode={"Edit"}
            variant="contained"
            color="primary"
            blog={row}
            callBackRefresh={callBack}
            sendNotification={notification}
          ></Dialogs>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleClickDeleteAlert}
          >
            Del
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cover Image</TableCell>
                    <TableCell align="Center">Content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.thumbnails.imagename}>
                    <TableCell component="th" scope="row">
                      <Card className={classes.img}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.img}
                            image={row.thumbnails.imagename
                            }
                          />
                        </CardActionArea>
                      </Card>
                    </TableCell>
                    <TableCell align="left">{row.content}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Post() {
  const [items, setItems] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const notification = (message, variant) =>{
    enqueueSnackbar(message, {variant});
  }
  const getPost= async ()=>{
    console.log(`Getting Posts...`);
    axios
      .get("/api/blog/getAllBlogs")
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error from get all post");
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Dialogs
                  mode={"New"}
                  variant="contained"
                  color="secondary"
                  callBackRefresh={getPost}
                  sendNotification={notification}
                  blog={{
                    title: "",
                    hashtags: [],
                    thumbnails:{
                      imagename: "",
                    },
                    content:"",
                  }}
                ></Dialogs>
              </TableCell>
              <TableCell>Item </TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="center" colSpan={2}>Options</TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <Row key={row.title} row={row} callBackRefresh={getPost}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function PostWithSnackBar() {

  return (
    <SnackbarProvider maxSnack={3}>
      <Post />
    </SnackbarProvider>
    );
  }
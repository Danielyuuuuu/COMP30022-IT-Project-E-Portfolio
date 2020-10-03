// import React from "react";
// import MediaOptionBar from "../../components/MediaOptionBar/MediaOptionBar";
// import {SelectedPictures} from "../../components/MediaOptionBar/SharedVar";

// export default function Gallery() {
//   const [selectedPictures, setPictures] = React.useState([]);
//   return (
//     <div>
//       <SelectedPictures.Provider value={{ selectedPictures, setPictures }}>
//         <MediaOptionBar></MediaOptionBar>
//       </SelectedPictures.Provider>
//       <div>
//         {selectedPictures.map((picture) => (
//           <div>{picture.filename}</div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Dialogs from "../../components/Dialogs/Dialogs";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

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

const categories = [
  {
    name: "Photography",
    coverImage: "http://localhost:8000/api/uploadManage/image/890c444028e88bc04522cdee2e9be0bd.jpg",
    subCategories: ["animel", "people", "city"],
  },
  {
    name: "ArtWorks",
    coverImage: "http://localhost:8000/api/uploadManage/image/8ab345134aebe787a4b15a70a92ccba8.jpg",
    subCategories: ["1", "2", "3"],
  },
]

function Row(props) {
  const history = useHistory();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const [openDeleteAlert, setDeleteAlert] = React.useState(false);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/api/store/delete/" + id)
      .then(console.log("delete item......"))
      .then((res) => {
        console.log(res);
        history.go(0);
      });
    handleCloseDeleteAlert();
  };

  const handleClickDeleteAlert = () => {
    setDeleteAlert(true);
  };
  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
  };

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
            // onClick={(e) => {
            //   handleDelete(row._id);
            // }}
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
          <h4>{row.name}</h4>
        </TableCell>
        <TableCell align="right">
          <Card className={classes.img}>
            <CardActionArea>
              <CardMedia
                className={classes.img}
                image={
                  row.coverImage
                }
              />
            </CardActionArea>
          </Card>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleClickDeleteAlert}
          >
            Delete
          </Button>
        </TableCell>
        <TableCell align="right">
          {/* {row.Options}  */}
          <Dialogs
            mode={"Edit"}
            variant="contained"
            color="primary"
            item={row}
          ></Dialogs>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Sub-Category
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {row.subCategories.map((sub) => (
                    <TableRow key={row.imagename}>
                      <TableCell component="th" scope="row">
                        {sub}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableCell align="right">{row.description}</TableCell>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Store() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Read the mutable latest value
    console.log(`Getting files...`);

    axios
      .get("http://localhost:8000/api/store/")
      .then((res) => {
        setItems(res.data.item);
        console.log(res.data.item);
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });
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
                  color="Secondary"
                  item={{
                    itemname: "",
                    stock: 0,
                    price: 0,
                    views: 0,
                    imagename: "",
                    description: "",
                  }}
                ></Dialogs>
              </TableCell>
              <TableCell>Category </TableCell>
              <TableCell>Cover Image</TableCell>
              <TableCell>Description?</TableCell>
              <TableCell align="center" colSpan={2}>
                Options?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <Row key={category.name} row={category} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

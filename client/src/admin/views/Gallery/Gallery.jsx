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
import Dialogs from "../../components/Dialogs/GalleryDialog";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";



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
    coverImage: "/api/uploadManage/image/890c444028e88bc04522cdee2e9be0bd.jpg",
    subCategories: ["Architecture", "Landscape", "Street","Events", "Portrait"],
  },
  {
    name: "Art Crafts",
    coverImage: "/api/uploadManage/image/8ab345134aebe787a4b15a70a92ccba8.jpg",
    subCategories: ["Carpentry", "Ceramics"],
  },
  {
    name: "Painting",
    coverImage: "/api/uploadManage/image/8ab345134aebe787a4b15a70a92ccba8.jpg",
    subCategories: ["Oil painting", "Sand painting", "Pencil Sketch", "Digital painting"],
  },
  {
    name: "Graphic Design",
    coverImage: "/api/uploadManage/image/8ab345134aebe787a4b15a70a92ccba8.jpg",
    subCategories: ["1", "2", "3"],
  },
]



function Row(props) {
  const history = useHistory();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();



  return (
    <React.Fragment>

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
                    <TableCell align="right">Options</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {row.subCategories.map((sub) => (
                    <TableRow key={row.imagename}>
                      <TableCell component="th" scope="row">
                        {sub}
                      </TableCell>
                      <TableCell align="right">
                        {/* {row.Options}  */}
                        <Dialogs
                          mode={"Edit"}
                          variant="contained"
                          color="primary"
                          category={row.name}
                          subcategory={sub}
                        ></Dialogs>
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
    
  );
}

export default function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Read the mutable latest value
    console.log(`Getting files...`);

    axios
      .get("/api/gallery/")
      .then((res) => {
        setGallery(res.data.artworks);
        console.log(res.data.artworks);
      })
      .catch((err) => {
        console.log("Error from getting all gallery informations");
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Category </TableCell>
              <TableCell>Cover Image</TableCell>

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

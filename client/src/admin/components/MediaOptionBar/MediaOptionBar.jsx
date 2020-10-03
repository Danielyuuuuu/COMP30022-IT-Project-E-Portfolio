import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

import {SelectedPictures} from "./SharedVar"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



const useRowStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  img: {
    width: 80,
    height: 60,
  },
  checkedBox: {
    marginRight: 8,
  },
});

export default function CheckboxesTags() {
  const classes = useRowStyles();

  const [images, setImages] = useState([]);
  let {selectedPictures, setPictures} =useContext(SelectedPictures);

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
  }, []);



  return (
      <div>
    <Autocomplete
      multiple
      id="MediaOptionBar"
      options={images}
      disableCloseOnSelect
      value={selectedPictures}
      onChange={(event, newValue) => {
        setPictures(newValue);
      }}
      getOptionLabel={(option) => option.filename}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            className={classes.checkedBox}
            checked={selected}
          />
          <Card className={classes.img}>
            <CardActionArea>
              <CardMedia
                className={classes.img}
                image={
                  "http://localhost:8000/api/uploadManage/image/" +
                  option.filename
                }
              />
            </CardActionArea>
          </Card>

          <div className={classes.checkedBox}>{option.filename}</div>
        </React.Fragment>
      )}
      className={classes.root}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Select Pictures"
          placeholder="Pictures"
        />
      )}
    />
    <div>{selectedPictures.map((picture)=>(
        <div>{picture.filename}</div>
    ))}</div>
    </div>
  );
}

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

import { SelectedPictures } from "./SharedVar"

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


export default function MediaOptionBar(props) {
  const classes = useRowStyles();

  const [images, setImages] = useState([]);

  let { selectedPictures, setPictures } = useContext(SelectedPictures);

  // const [isMount, setIsMount]=useState(false);
  // const [isMatch, setIsMatch]= useState(false);

  const handleSetImages = (rawData)=>{
    var imagesList = [];
    for (var i in rawData){
      imagesList.push(rawData[i].filename);
    }
    setImages(imagesList);
  }


  useEffect(() => {
    
    // if (images.length!=0){
    //   setIsMount(true);
    //   console.log("changing ismount to true")
    //   console.log(images);
    //   if (!isMatch){
    //     setIsMatch(true);
    //     matchImages();
    //   }
    // }

    // if (!isMount){
      console.log(`Getting files...`);
      axios
        .get("/api/uploadManage/files")
        .then((res) => {
          handleSetImages(res.data);
          console.log("res data: ",res.data);
        })

        .catch((err) => {
          console.log("Error from getting all files");
        });

    // }
    
  }, []);

  // const matchImages = () => {
  //   console.log(images);
  //   var tmpList=[];
  //   for (var defaultImageIndex in props.defaultImages) {
  //     console.log("defaultImages",props.defaultImages[defaultImageIndex]);
  //     for (var imagesIndex in images) {
  //       console.log("AllImages",images[imagesIndex].filename);
  //       if (props.defaultImages[defaultImageIndex] == images[imagesIndex].filename){
  //         tmpList.push(images[imagesIndex]);
  //         break;
  //       }
  //     }
  //   }
  //   setTestS(tmpList);
  //   // console.log(testS);
  // }

  return (
    <div>
      <Autocomplete
        multiple
        id="MediaOptionBar"
        options={images}
        disableCloseOnSelect
        // getOptionSelected={(option,value)=>{
        //   // console.log(value);
        //   if (option.filename==value.filename){
        //     return true;
        //   }
        //   return false;
        // }}

        value={selectedPictures}
        onChange={(event, newValue) => {
          setPictures(newValue);
        }}

        getOptionLabel={(option) => option}
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
                    "/api/uploadManage/image/" +
                    option
                  }
                />
              </CardActionArea>
            </Card>

            <div className={classes.checkedBox}>{option}</div>
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
      <div>{selectedPictures.map((picture) => (
        <div>
          <div>
            {picture}
          </div>

        </div>
      ))}</div>
    </div>
  );
}

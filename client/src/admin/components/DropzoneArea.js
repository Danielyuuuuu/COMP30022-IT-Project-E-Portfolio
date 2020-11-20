import Button from "@material-ui/core/Button";
import Axios from "axios";
import { DropzoneDialog } from "material-ui-dropzone";
import React, { useState } from "react";


export default function DropZone(props) {
  const [open, setOpen] = useState(false);

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSave = async (files) => {
    //Saving files to state for further use and closing Modal.
    setOpen(false);
    console.log("Before Axios................");

    for (var i = 0; i < files.length; i++) {
      let imageFile = new FormData();
      imageFile.append("file", files[i]);

      await Axios.post(
        "/api/uploadManage/upload",
        imageFile
      );
    }

    // trigger parent compoenent to re-render the media
    props.callBack();

    console.log("successful................");
    // history.go(0);
  };

  const handleOpen = async () => {
    setOpen(true);
  };


  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add Image
      </Button>
      <DropzoneDialog
        open={open}
        onSave={(e) => handleSave(e)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        filesLimit={10}
        maxFileSize={5000000}
        onClose={() => handleClose()}
      />
    </div>
  );
}

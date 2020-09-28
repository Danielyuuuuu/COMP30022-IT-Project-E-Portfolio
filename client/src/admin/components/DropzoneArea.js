import React, { Component, useState } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function DropZone() {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleClose = async () => {
    setOpen(false);
  };

  const handleSave = async (files) => {
    //Saving files to state for further use and closing Modal.
    setFiles(files);
    setOpen(false);
    console.log("Before Axios................");

    for (var i = 0; i < files.length; i++) {
      let imageFile = new FormData();
      imageFile.append("file", files[0]);

      const postRes = await Axios.post(
        "http://localhost:8000/api/uploadManage/upload",
        imageFile
      );
    }

    console.log("successful................");
    history.push("/admin/dashboard");
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  const history = useHistory();

  return (
    <div>
      <Button onClick={() => handleOpen()}>Add Image</Button>
      <DropzoneDialog
        open={open}
        onSave={(e) => handleSave(e)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => handleClose()}
      />
    </div>
  );
}

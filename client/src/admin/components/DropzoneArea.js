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
  };

  const handleOpen = async () => {
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={() => handleOpen()}>Add Image</Button>
      <DropzoneDialog
        open={open}
        onSave={(e) => handleSave()}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => handleClose()}
      />
    </div>
  );
}

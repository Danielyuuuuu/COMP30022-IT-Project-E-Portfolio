import React from "react";
import Alert from "@material-ui/lab/Alert";
import BackspaceIcon from '@material-ui/icons/Backspace';

export default function ErrorNotice(props) {
  return (
    <div className="errorNotice">
        <Alert severity={props.severity}>
          {props.message}        
        </Alert>
    </div>
  );
}

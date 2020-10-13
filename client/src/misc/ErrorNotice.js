import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BackspaceIcon from '@material-ui/icons/Backspace';

export default function ErrorNotice(props) {
  return (
    <div className="errorNotice">
        <Alert severity={props.severity}>
          {props.message}        
          <button onClick={props.clearError}>
            <BackspaceIcon />
          </button>
        </Alert>
    </div>
  );
}

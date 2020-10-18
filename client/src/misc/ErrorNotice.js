import React from "react";
import Alert from "@material-ui/lab/Alert";

export default function ErrorNotice(props) {
  return (
    <div className="errorNotice">
        <Alert severity={props.severity}>
          {props.message}        
        </Alert>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialogs from "../../components/Dialogs/PostDialog";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });

export default function Setting(){
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit = () => {
        console.log("From email: ");
        console.log(email);
        console.log(newPassword);
        console.log(confirmNewPassword);

        const token = localStorage.getItem("auth-token");
        console.log("Token: " + token)
        axios
        .post("http://localhost:8000/api/user/changePassword", { "token": token, "email": email, "newPassword": newPassword, "repeatNewPassword": confirmNewPassword } )
        .then((res) => {
            console.log("In axios: ");
            console.log(res.data.msg);
        })
        .catch((err) => {
            console.log(err.response.data);
        });
    }

    return (
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Edit Password
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Password</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New Password"
                type="text"
                fullWidth
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Confirm New Password"
                type="text"
                fullWidth
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );

    // return (
    //     <div>
    //     <Dialogs
    //         mode={"Edit Password"}
    //         variant="contained"
    //         color="primary"
    //         // callBackRefresh={getPost}
    //         blog={{
    //         title: "",
    //         hashtags: [],
    //         thumbnails:{
    //             imagename: "",
    //         },
    //         content:"",
    //         aaaa: ""
    //         }}
    //         // user={{
    //         //     email: "",
    //         //     newPassword: "",
    //         //     repeatNewPassword: ""
    //         // }}
    //     ></Dialogs>
    //     </div>
    // );
}
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
let marked = require("marked");

const options = ["Tag 1", "Tag 2", "Tag 3", "Tag 4"];

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tag: {
        top: 10,

    },

});

const imgStyles = makeStyles({
    img: {
        width: 160,
        height: 90,
    },
    content: {
        minWidth: 600,
    },
    background: {
        maxWidth: 600,
    },
    paper: {
        maxWidth: 400,
    },
    tag: {
        marginTop: 10,
        marginBottom: 10,
    },
});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const Markdown = (props) => {
    const content = marked(props.markdown)
    return content;
}

export default function DialogsOfStore(props) {
    const [open, setOpen] = React.useState(false);
    const [openJ, setOpenJ] = React.useState(false);
    const classes = imgStyles();

    const [markdown, setMarkDown] = React.useState(props.blog.content);
    const [tag, setTags] = React.useState(props.blog.hashtags);
    const [title, setTitle] = React.useState(props.blog.title);
    const [imageUrl, setImageUrl] = React.useState(props.blog.thumbnails.imagename);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const cleanData = ()=>{
        setMarkDown("");
        setTags([]);
        setTitle("");
        setImageUrl("");
    }

    const handleSubmit = () => {
        console.log("before post......");
        const data = {
            postTitle: title,
            imageUrl: imageUrl,
            postBody: markdown,
            hashTags: tag,
        };
        const editData = {
            postID: props.blog._id,
            postTitle: title,
            imageUrl: imageUrl,
            postBody: markdown,
            hashTags: tag,
        }
        if (props.mode == "New") {
            Axios.post("http://localhost:8000/api/blog/uploadblog", data)
                .then(console.log("adding new post......"))
                .then((res) => {
                    console.log(res);
                    cleanData();
                    props.callBackRefresh();
                });
        } else {
            Axios.post(
                "http://localhost:8000/api/blog/editBlog",
                editData
            )
                .then(console.log("edit item......"))
                .then((res) => {
                    console.log(res);
                    props.callBackRefresh();
                });
        }

        setOpen(false);

        // history.go(0);
    };




    // const submit = async (e) => {
    //     e.preventDefault();

    //     const newPost = {
    //       postTitle: title,
    //       imageUrl: imageUrl,
    //       postBody: markdown,
    //       hashTags: tag,
    //     };
    //     const postRes = await Axios.post(
    //       "http://localhost:8000/api/blog/uploadblog",
    //       newPost
    //     );
    //     console.log("successful................");
    //     history.push("/admin/dashboard");
    //   };

    return (
        <div>
            <Button
                variant={props.variant}
                color={props.color}
                onClick={handleClickOpen}
                startIcon={<EditOutlinedIcon />}
            >
                {props.mode}
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={"lg"}
                maxWidth={"lg"}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.mode + " Post"}
                </DialogTitle>
                <DialogContent dividers>
                    {/* <div>{props.blog.title}</div> */}
                    {/* <Paper elevation={1} classes={classes.background}> */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="Post Title"
                                name="Post Title"
                                label="Post Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="Image Url"
                                name="Image Url"
                                label="Image Url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Autocomplete
                        multiple
                        className={classes.tag}
                        value={tag}
                        onChange={(event, newValue) => {
                            setTags(newValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" variant="outlined" />
                        )}
                    />

                    <Grid
                        container
                        spacing={2}
                        wrap="nowrap"
                    >
                        <Grid item xs={6}>
                            <TextField
                                id="filled-multiline-static"
                                label="Post Content"
                                multiline
                                fullWidth

                                rows={40}
                                defaultValue="Default Value"
                                variant="filled"
                                value={markdown}
                                onChange={(event) => setMarkDown(event.target.value)}
                            />
                        </Grid>

                        <Grid item xs={6} >
                            <Typography>Actual translate:</Typography>
                            <Typography >
                                <div dangerouslySetInnerHTML={{ __html: marked(markdown) }}></div>
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* </Paper> */}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

const express = require('express');
const uploadRouter = express.Router();

//import the 
const upload = require('../models/db').upload;


//import the controller
const uploadController = require('../controllers/upload');

//@Route GET /
//@desc Loads form
uploadRouter.get('/', uploadController.getUploadForm);

//@Route POST /upload
//@desc uploads File to Db
uploadRouter.post('/upload', upload.single('file'),uploadController.postFile);

//@route GET/ FIles
//@desc Display all files in JSON
uploadRouter.get('/files', uploadController.getAllFiles);

//@route GET/ FIles/:filename
//@desc Display file in JSON
uploadRouter.get('/files/:filename', uploadController.getSingleFile);

//@route GET/ image/:filename
//@desc Display single image
uploadRouter.get('/image/:filename', uploadController.getSingleImage);

//@route DELETE /files/:id 
//@desc Delete file
uploadRouter.delete('/files/:id', uploadController.postDeleteFile);

module.exports = uploadRouter;
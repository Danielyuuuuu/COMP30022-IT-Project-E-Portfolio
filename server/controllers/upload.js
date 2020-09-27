const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const mongoose = require('mongoose');
//require the js
const db = require('../models/db');
//require the var
const conn = db.db;

//init gfs
var gfs;
conn.once('open', () => {
    // Init the stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

// get the upload form
const getUploadForm = async (req,res) => {
    gfs.files.find().toArray((err, files) => {
        //files if exist
        if(!files || files.length === 0) {
            res.render('uploadPage', {files: false});
        }else{
            files.map(file => {
                if (file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
                    file.isImage = true;
                }else{
                    file.isImage = false;   
                }
            });
            res.render('uploadPage', {files: files});
        }
    });
}

// upload the file
const postFile = async(req,res) =>{
    res.redirect('/api/uploadManage');
}

// display all files in array
const getAllFiles = async (req,res)=>{
    gfs.files.find().toArray((err, files) => {
        //files if exist
        if(!files || files.length === 0) {
            return res.status(404).json({
                err: "NO Such File"
            });
        }
        //File exist 
        return res.json(files);
    })
}

// show the single file 
const getSingleFile = async(req,res)=>{
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        //files if exist
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: "NO Such File"
            });
        }
        //File exist 
        return res.json(file);
    })
}

// display single image
const getSingleImage = async(req,res)=>{
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        //files if exist
        if(!file || file.length === 0) {
            return res.status(404).json({
                err: "NO Such File"
            });
        }
        //check if image
        if(file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
            //read output to broswer
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }else{
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
}

// delete the file
const postDeleteFile = async(req,res) =>{
    gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore)=> {
        if(err){
            return res.status(404).json({err: "Can not delete"});
        }

        res.redirect('/api/uploadManage');
    })
}

module.exports = {
    getUploadForm,
    getAllFiles,
    postFile,
    getSingleFile,
    getSingleImage,
    postDeleteFile,
};
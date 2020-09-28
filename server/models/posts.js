const mongoose = require('mongoose');
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var Posts = new Schema({
title :String,    
description :String,
by :String,
url :String
});
module.exports = mongoose.model('Posts', Posts);
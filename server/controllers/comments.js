const Comments = require('../models/comments');


const getComments = async(req,res) => {
    Comments.find()
        .populate('blogId')
        .sort({'createdAt':-1})
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error' + err));
};


const getBlogComments = async(req,res) =>{
    console.log(req.params.id);
    await Comments
    .find({blog: req.params.id})
    .sort({'createdAt':-1})
    .then(comments => res.status(200).json({
        success: true,
        item: comments,
    }))
    .catch(err => res.status(400).json('Error' + err));
};

const getSingleComment = async(req,res)=>{
    console.log(req.params.id);
    Comments.findById(req.params.id)    
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({ nobookfound: "No comment found" }))
};

const addComment = async (req,res) => {

    //console.log(req.body);
    const comment = new Comments({
        blog : req.body.blogId,
        publisher: req.body.publisher,
        content : req.body.content,
    });
    console.log(comment);
    try {
        const savedComment = await comment.save()
        .then((comm) => {
            res.status(200).json({
              success: true,
              comm,
            });
          })
          .catch((err) => res.status(400).json(err));
    }catch(err){
        res.status(400).send(err);
    }
};

const deleteComment = async(req,res) => {
    Comments.findByIdAndDelete({_id: req.params.id})
    .then(comment => res.json({mgs:"comment have been deleted successfully"}))
    .catch(err => res.status(404).json({error :"no such comment"}))
}




module.exports = {
    getComments,
    getBlogComments,
    getSingleComment,
    addComment,
    deleteComment,
}
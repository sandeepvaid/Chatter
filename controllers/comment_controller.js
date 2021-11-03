const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    //Validate the comment by checking that the post on which we add a comment is a valid post
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("There is an error in adding the comment");
            return;
        }

        Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        },function(err,comment){
            if(err){
                console.log("Error in adding comment to the database");
                return;
            }
            post.comments.push(comment);
            post.save();
            return res.redirect("/")
        });
        
    })

}
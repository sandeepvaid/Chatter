const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


module.exports.create = async function(req,res){
    //Validate the comment by checking that the post on which we add a comment is a valid post

    try{
        let post = await Post.findById(req.body.post);
        let comment = await Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:req.body.post
        });
        await comment.populate('user');
        post.comments.push(comment);
        post.save();

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment,
                },
                message:"Comment is created by AJAx"
            })
        }

        req.flash('success','Comment is created');
        return res.redirect("back")
    }catch(err){
        console.log("Error in adding comment to the database");
        return;
    }

}

//Deletion of comment 
module.exports.destroy = async function(req,res){

    try{
        let comment =await Comment.findById(req.params.id );
        let user = await User.findById(req.user.id);
    
        if(comment.user == req.user.id || user.id == req.user.id){
            let postId = comment.post;
            comment.remove()
            await Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})
        }

        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment_id:req.params.id
                },
                message:"Yeah am deleting the comment",
                name:req.user.name
            })
        }

        req.flash('success','Comment is deleted');
        return res.redirect('back');

    }catch(err){
        req.flash('error','You are not authorized!!');
        return res.redirect('back');
    }

    
}
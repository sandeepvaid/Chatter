const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');


module.exports.create =  function(req,res){
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
            req.flash('success','Comment is created');
            return res.redirect("/")
        });
        
    })

}

//Deletion of comment 
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id , function(err,comment){
        // console.log(req.);
        User.findById(req.user.id,function(err,findeduser){
            console.log(findeduser);
            if(comment.user == req.user.id || findeduser.id == req.user.id){
                let postId = comment.post;

                comment.remove();
                req.flash('success','Comment is deleted');
                Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}},function(err,post){
                    return res.redirect('back');
                })
            }else{
                req.flash('error','You are not authorized!!');
                return res.redirect('back');
            }
        })
        
    })
}
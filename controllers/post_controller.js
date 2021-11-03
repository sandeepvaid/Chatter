const Post = require('../models/post');
const Comment = require('../models/comment');
//Post controller
module.exports.createPost = function(req,res){
    // console.log(req.body);
    // console.log(req.user._id);
    // return res.redirect('/');
   
        Post.create({
            content:req.body.content,
            user:req.user._id
        },function(err,post){
            if(err){
                console.log("There is an error in creating the post");
                return;
            }
        });

        return res.redirect('/');
      
}

//Controller to delete comments using params
module.exports.destroy = function(req,res){
    console.log(req.params.id);
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log("The post you want to delete is not there in db");
            return res.redirect('back');
        }else{
            //Now we come to know that there is a post by that id now we check that if the requested user how want to delete the post and the person how created that post is same then we can delete the post
            // console.log(post.user);
            // console.log(req.user._id);
            if(post.user == req.user.id){
                post.remove()

                Comment.deleteMany({post:req.params.id},function(err){
                    return res.redirect('back');
                });
            }else{
                console.log("post user and deleted user not matched")
                return res.redirect('back');
            }
        }

        
    })
}
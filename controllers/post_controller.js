const Post = require('../models/post');
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
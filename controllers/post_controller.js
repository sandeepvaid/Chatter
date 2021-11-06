const Post = require('../models/post');
const Comment = require('../models/comment');
//Post controller
module.exports.createPost = async function(req,res){
    // console.log(req.body);
    // console.log(req.user._id);
    // return res.redirect('/');
        try{
            await Post.create({
                content:req.body.content,
                user:req.user._id
            });
            req.flash('success','Your post is uploaded');
            return res.redirect('/');
        }catch(err){
            req.flash('error','Some error in post');
            console.log("Error",err);
        }
        
      
}

//Controller to delete comments using params
module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove()
    
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Your post is deleted !!');
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post!!');
            console.log("post user and deleted user not matched")
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        console.log("Error in logout");
        return res.redirect('back');
    }
    
  
}
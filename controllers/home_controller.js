const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie("user_id" , 45);

    // Post.find({},function(err,posts){
    //     return res.render('home' ,{
    //         title:"Chatter",
    //         posts:posts
    //     });
    // });

    //NOW HERE WE HAVE USER OBJECT ID BUT WE WANT THE INFORMATION RELATED TO THAT OBJECT ID FOR THAT WE HAVE TO CHECK IN THE USER MODEL AND SEARCH FOR THE USER ID AND FETCH DATA FROM THERE . IN MONGOOSE WE HAVE A CONCEPT OF POPULATING WHICH WE USED HERE
    Post.find({})
    .populate('user')
    .populate({
        path:'comments' ,
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
            return res.render('home' ,{
                title:"Chatter",
                posts:posts
            });
        });
 
};


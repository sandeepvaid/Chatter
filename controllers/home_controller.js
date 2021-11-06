const Post = require('../models/post');
const User = require('../models/user');

    //NOW HERE WE HAVE USER OBJECT ID BUT WE WANT THE INFORMATION RELATED TO THAT OBJECT ID FOR THAT WE HAVE TO CHECK IN THE USER MODEL AND SEARCH FOR THE USER ID AND FETCH DATA FROM THERE . IN MONGOOSE WE HAVE A CONCEPT OF POPULATING WHICH WE USED HERE

    //Here we convert our code in asynchronous code
module.exports.home = async function(req,res){
    
    try{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments' ,
            populate:{
                path:'user'
            }
        })
    
        let users = await User.find({})
       
               
        return res.render('home' ,{
            title:"Chatter",
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log('There is an error in the servor',err);
        return;
    }

    
            
            
        
 
};

// console.log(req.cookies);
    // res.cookie("user_id" , 45);

    // Post.find({},function(err,posts){
    //     return res.render('home' ,{
    //         title:"Chatter",
    //         posts:posts
    //     });
    // });
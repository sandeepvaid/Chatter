//import the user models
const  Cookie  = require('express-session');
const User = require('../models/user');

//Profile action
module.exports.profle = function(req,res){
    User.findById(req.params.id , function(err,user){
        return res.render('profile',{
            title:"Profile",
            user_profile:user
        });
    })
    
}

//Update the profile
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id ,req.body,function(err,user){
            return res.redirect('back');
        
    });
    }else{
        return res.status(401).send('Unauthorized');
    }
}



//signup action
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }

    return res.render("sign_up",{
        title:"User | Sign-Up"
    });
}

//Signin action
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render("sign_in",{
        title:"User | Sign-in"
    });
}

//Taking user data and add up in database to make it signup
module.exports.create = function(req,res){
   //validadting user password
    if(req.body.password != req.body.confirm_password){
       return res.redirect("back");
   }

   //Check if that email is already present or not
   User.findOne({email:req.body.email},function(error,user){
    if (error){console.log("There is an error in validating the user email"); return; }
    console.log(user)
    if(!user){
        User.create(req.body,function(err,user){
            
             if(err){console.log("There is an error in creating user in database the user email",err); return; }
             return res.redirect('/user/sign-in');
        });
    }else{
         return res.redirect("back");
    }
});
}

module.exports.createSession = function(req,res){
    return res.redirect('/user/profile');
}

//Destroy the session or sign pout
module.exports.destroySession = function(req,res){
    
    req.logout();
    return res.redirect('/');
}


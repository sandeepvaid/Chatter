//import the user models
const  Cookie  = require('express-session');
const User = require('../models/user');

//Profile action
module.exports.profile = async function(req,res){

    try{
        let user = await User.findById(req.params.id)
    
        return res.render('profile',{
            title:"Profile",
            user_profile:user
            
        });
    }catch(err){
        console.log('There is an error in profile loading',err);
        return;
    }

    
    
}

//Update the profile
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id ,req.body,function(err,user){
            req.flash('success','You are updated successfully!!');
            return res.redirect('back');
        
    });
    }else{
        return res.status(401).send('Unauthorized');
    }
}



//signup action
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        req.flash('error','You are already signed in no need of signup!!');
        return res.redirect('/user/profile')
    }

    return res.render("sign_up",{
        title:"User | Sign-Up"
    });
}

//Signin action
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        req.flash('error','You are already signed in');
        return res.redirect('/user/profile')
    }
    return res.render("sign_in",{
        title:"User | Sign-in"
    });
}

//Taking user data and add up in database to make it signup
module.exports.create =async function(req,res){
   //validadting user password
    if(req.body.password != req.body.confirm_password){
       return res.redirect("back");
   }

   try{
        let user = await User.findOne({email:req.body.email})
        if(!user){
                User.create(req.body,function(err,user){
                    
                    if(err){console.log("There is an error in creating user in database the user email",err); return; }
                    req.flash('success','Data is saved successfully in database');
                    return res.redirect('/user/sign-in');
                });
            }else{
                req.flash('error','Data is not correct!!');
                return res.redirect("back");
            }
   }catch(err){
        req.flash('error','Data is not correct!!');
       console.log('There is an error in create person db',err)
   }

   
}

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

//Destroy the session or sign pout
module.exports.destroySession = function(req,res){
    req.flash('success','Logged out Successfully');
    req.logout();
    return res.redirect('/');
}


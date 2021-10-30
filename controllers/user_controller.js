//import the user models
const User = require('../models/user');

//Profile action
module.exports.profle = function(req,res){
    //Validate the user enterance
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(err){console.log("There is an error in validating the user profile"); return;}

            //If user is there
            if(user){
                return res.render("profile",{
                    name:user.name,
                    email:user.email
                });
            }
        })
    }else{
        return res.redirect("/user/sign-in");
    }
}

//signup action
module.exports.signUp = function(req,res){
    return res.render("sign_up",{
        title:"User | Sign-Up"
    });
}

//Signin action
module.exports.signIn = function(req,res){
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

    if(!user){
        User.create(req.body,function(err,user){
             if(err){console.log("There is an error in creating user in database the user email"); return; }
             return res.redirect('/user/sign-in');
        });
    }else{
         return res.redirect("back");
    }
});
}

//Create user or signin action or login action
module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if (err){console.log("There is an error in finding the user email in sign in"); return; }

        //handle user found
        if(user){
            //handling mismatching / validate password
            if(user.password != req.body.password){
                return res.redirect("back");
            }
            //If password is correct handle the session creation
            res.cookie("user_id",user.id);
            return res.redirect("/user/profile");

        }else{
            //handle user not found
            return res.redirect("back");
        }
    });    
}


//Create action for user sign out
module.exports.signOut = function(req,res){
    res.clearCookie("user_id");
    return res.redirect('/');
};
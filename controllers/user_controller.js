//Profile action
module.exports.profle = function(req,res){
    return res.end("<h1>User profile is loading!!</h1>");
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
    //TO do later
}

module.exports.createSession = function(req,res){
    //TO do later
}

module.exports.home = function(req,res){

    // res.cookie("user_id" , 45);
    return res.render('home' ,{
        title:"Chatter"
    });
};


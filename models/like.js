const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId 
    },
    //this defines the object id of the liked object means on which like is made post or comment
    likeable:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true,
        refPath:'onModel'
    },
    //this field is used to define the type of liked object since it is dynamic
    onModel:{
        type:String,
        required:true,
        enum:['post','comment']
    }

},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;
const mongoose = require('mongoose');

const PostSchema =  new mongoose.Schema({
    title:String,
    description:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    image:{
        type:String
    }
})

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
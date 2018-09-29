const mongoose = require("mongoose");
const Post = require('./models/post');


mongoose.connect('mongodb://ayush:abcd1234@ds115653.mlab.com:15653/bloggingwebsite',{ useNewUrlParser: true }).then(()=>console.log("connected")).catch((err)=>console.log(err));

// Post.create({
//     title: " 3 My title",
//     description:"3 goes here",
//     content:'3 lorem ipsum dolor'
// }).then(()=>console.log("successfull")).catch((err)=>console.log(err));

// Post.find({}, (err, posts)=>{ console.log(err,posts, posts[posts.length -1].title)})

// Post.findById("5babeb310b603e161b411caa", (err,post)=>console.log(err,post))

Post.findByIdAndUpdate("5babeb310b603e161b411caa",{title: 'comeon',
description: '3 goes here',
content: '3 lorem ipsum dolor',},(err,posts)=>console.log(posts)).catch((err)=>console.log(err));
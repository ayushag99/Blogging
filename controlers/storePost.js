const Post = require("../models/post");
const path = require("path")
const User = require("../models/user");

module.exports = (req,res)=>{
    const {image} = req.files
    console.log(image);
    if(image){
        image.mv(path.resolve(__dirname, '..','public/posts', image.name), (error)=>{
            Post.create({
                ...req.body,
                image:`/posts/${image.name}`,
                author:req.session.userId,
            }, )
            .then((post)=>{

                console.log(typeof req.body)

                res.redirect('/');
            })
        })
    } else {
        Post.create({
            ...req.body,
            image:`/img/post-sample-image.jpg`,
            author:req.session.userId,
        }, )
        .then((post)=>{
            
            res.redirect('/');
        })
    }

}
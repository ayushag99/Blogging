let Post = require("../models/post")

module.exports =async (req,res) => {

    const posts = await Post.find({}).populate('author');
    // posts.reverse();
    console.log(req.session)
    res.render('index',{
        posts
    });
}
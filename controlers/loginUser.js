const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = (req,res)=>{
    const {email , password} = req.body;

    //Find User
    User.findOne({email}, (error,user)=>{
        if(user){
            bcrypt.compare(password , user.password, (error,result)=>{
                if(result){
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/users/login')
                    console.log("Incorrect Password");
                }
            })
        } else {
            res.redirect('/users/login')
            console.log("Incorrect Id")
        }
    })

    //Compare user password


    //Coreect Password then login
}
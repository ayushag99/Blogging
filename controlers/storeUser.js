const User = require('../models/user')


module.exports = (req,res)=>{
    User.create(req.body, (error,user)=>{
        if(error){
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            // req.session.registerationErrors = registerationErrors;
            req.flash('registrationErrors',registrationErrors)
            req.flash('data', req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })

}
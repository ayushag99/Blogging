module.exports = (req,res)=>{
    console.log(req.session.registerationErrors)
    
    res.render('register',{
        errors:req.flash('registrationErrors'),
        data: req.flash('data')[0]
    })
}
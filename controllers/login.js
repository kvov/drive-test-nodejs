module.exports = (req,res)=>{
    res.render('login',{
        title: 'Login',
        page_name: 'login',
        errors: req.flash( 'validationErrors' ),
        messages: req.flash( 'messages' )
    })
};
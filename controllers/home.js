module.exports = (req,res)=>{
    res.render('index', {
        title: 'Dashboard',
        page_name: 'index',
        messages: req.flash( 'messages' ),
        errors: req.flash( 'validationErrors' )
    });
};
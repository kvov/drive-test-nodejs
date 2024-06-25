module.exports = (req, res) =>{
    var username = "";
    var password = "";
    var userType = "";
    const rData = req.flash('data')[0];

    if (typeof rData != 'undefined') {
        username = rData.username;
        password = rData.password;
        userType = rData.userType;
    }
    res.render('signup',{
        title: 'Sign up',
        page_name: 'signup',
        messages: req.flash(''),
        errors: req.flash('validationErrors'),username,password,userType
    }) 
}

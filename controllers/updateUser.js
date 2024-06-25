const User = require('../models/user');
const path = require('path');
//updating car details
module.exports = async (req,res)=>{
    User.findByIdAndUpdate (req.session.userId, {
        firstName:req.body.firstName, 
        lastName:req.body.lastName,
        licenseNo:req.body.licenseNo, 
        age:req.body.age,
        carDetails: { 
            make: req.body.make, 
            model: req.body.model, 
            year: req.body.year, 
            platNo: req.body.platNo 
        }
    })
    .then(user=>{
        return user
    })
    .catch(error=>{
    //handle error
    console.log(error);
    const validationErrors = Object
        .keys(error.errors)
        .map(key=>error.errors[key].message)
        console.log(`Validation Errors: ${validationErrors}`)
        req.flash('validationErrors', validationErrors)
        req.flash('data',req.body)
        res.redirect('/auth/signup')
    })
    req.flash( 'messages', [ "Successfully updated!" ] );
    res.redirect('/')
};




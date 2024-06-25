const User = require('../models/user')
const path = require('path')
module.exports = async (req,res)=>{
    try{
        const newUser = await User.create({
            username:req.body.username,
            password:req.body.password,
            userType:req.body.userType,
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
        console.log('newUser Info ==>>'+newUser)
        res.redirect('/')
    }
    catch(error){
        //handle error
        const validationErrors = Object
            .keys(error.errors)
            .map(key=>error.errors[key].message)
            req.flash('validationErrors', validationErrors)
            req.flash('data',req.body)
            return res.redirect('/auth/signup')
    }
};
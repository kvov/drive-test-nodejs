const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) =>{
    try{
        const username= req.body.username;
        const password = req.body.password;
        const userInfo =  await User.findOne({username:username})
        if(userInfo){ 
            bcrypt.compare(password,userInfo.password,(error,isSame)=>{
                if( error ) {
                    req.flash( 'validationErrors', [ "Unable to check password" ] )
                    res.redirect( "/auth/login" )
                } else {
                    if( isSame ) {
                        // store user session
                        // now each time user makes a request this cookie is sent to server with authentication id
                        req.session.userId = userInfo._id;
                        req.session.userType = userInfo.userType;
                        if( userInfo.userType === "Driver" ) {
                            req.flash( 'messages', [ "Welcome to the driver dashboard" ] )
                            res.redirect( "/" )
                        } else if( userInfo.userType === "Examiner" ) {
                            req.flash( 'messages', [ "Welcome to the examiner dashboard" ] )
                            res.redirect( '/' )
                        } else if( userInfo.userType === "Admin" ) {
                            req.flash( 'messages', [ "Welcome to the admin dashboard" ] )
                            res.redirect( '/' )
                        }
                    } else {
                        req.flash( 'validationErrors', [ "Incorrect username/password" ] )
                        res.redirect( "/auth/login" )
                    }
                }
            })      
        }
        else{
            req.flash( 'validationErrors', [ "Signup first to login" ] )
            res.redirect( "/auth/signup" )
        }
    }
    catch(error){
        console.log('Error : '+error);
        res.redirect('/auth/login');
    }
};
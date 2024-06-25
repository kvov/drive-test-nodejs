const User = require('../models/user')

module.exports = async (req,res,next) => {
    try {
        if( !req.session.userId ) {
            req.flash( 'validationErrors', [ "Login before accessing Admin portal" ] )
            return res.redirect( "/auth/login" )
        }
        const user = await User.findById(req.session.userId).exec()
        console.log(user);

        if(user && user.userType == 'Admin') {
            return next()
        }
        return res.redirect('/')
    } catch (error) {
        if( error || !user ) {
            req.flash( 'validationErrors', error.errors
                ? Object.keys( error.errors ).map( key => error.errors[ key ].message )
                : [ "Unable to find user" ] )
            return res.redirect( "/auth/login" )
        } else if( user.userType !== 'Admin' ) {
            req.flash( 'validationErrors', [ "Users other than admin do not have access" ] )
            return res.redirect( "/" )
        }
        
    }
};

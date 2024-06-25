//middleware to validate the user creation form
module.exports = (req,res,next) => {
    if (req.body.firstName == "" || 
        req.body.lastName == "" ||
        req.body.licenseNo == null || 
        req.body.age == null ||
        req.body.make == "" ||
        req.body.model == ""|| 
        req.body.year == null || 
        req.body.platNo == "") {
            return res.redirect('/g2test')
    }
    next()
};
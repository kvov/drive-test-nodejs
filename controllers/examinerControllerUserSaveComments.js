
const UserG = require('../models/user')


module.exports = async (req, res) => {


    let idupdate = req.body.idUser;
    let men;
    let resultT;

    if (req.body.passTest === "Y") {
        resultT = true;
    } else {
        resultT = false;
    }



    men = "User upload!!!";
    UserG.findByIdAndUpdate(idupdate, {
        examinerComment: req.body.comments,
        testResult: resultT
    })
        .then(data => {
            console.log('user information uplated!!!' + data)
        })
        .catch(err => {
            console.log(`Error::` + err)
        })



    req.flash('messages', ["Successfully updated!"]);
    res.redirect('/')




}
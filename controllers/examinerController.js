module.exports = (req,res)=>{

    let testDate = req.body.testDate;
    let testType = req.body.testType; 
    


    res.render('examiner',{
        title: 'Examiner',
        page_name: 'Examiner',
        testDate,
        testType,
        errors: req.flash( 'validationErrors' ),
        messages: req.flash( 'messages' )
    })

};
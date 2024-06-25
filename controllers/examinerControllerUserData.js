const UserG = require('../models/user')

module.exports = async (req, res) => {

    let testDate = req.body.testDate;
    let testType = req.body.testType;
    let appointmentId = req.body.idApp;

    let idUser;
    let firstName;
    let lastName;
    let age;
    let make;
    let model;
    let year;
    let result;
    let comments;
    

    try {
        usuario = await UserG.find({ appointmentId: appointmentId }).exec();
        console.log("usuario=" + usuario);

        usuario.forEach(usuario => {
            console.log('_id:', usuario._id);
            console.log('firstName:', usuario.firstName);
            console.log('lastName:', usuario.lastName);
            console.log('age:', usuario.age);
            console.log('make:', usuario.carDetails.make);
            console.log('model:', usuario.carDetails.model);
            console.log('year:', usuario.carDetails.year);
            idUser =  usuario._id;
            firstName = usuario.firstName ;
            lastName =  usuario.lastName;
            age =  usuario.age;
            comments =  usuario.examinerComment;
            result =  usuario.testResult;
            make =  usuario.carDetails.make;
            model = usuario.carDetails.model ;
            year =  usuario.carDetails.year;

        });

    } catch (error) {
        console.error('Error by find appointmentId:', error);
    }

    res.render('examinerUserData', {
        title: 'examinerUserData',
        page_name: 'examinerUserData',
        testDate,
        testType,
        idUser,
        firstName,
        lastName,
        age,
        make,
        model,
        year,
        comments,
        result
    })
};
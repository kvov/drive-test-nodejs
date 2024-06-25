const User = require('../models/user');
const Appointment = require('../models/Appointment');
const path = require('path');

module.exports = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);

            // Check if the user has an appointment
            const appointment = await Appointment.findById(user.appointmentId);

            if (user.firstName == "") {
                req.flash('warning', ["Please fill in all the data"]);
            } 

            console.log(user.examinerComment, user.testResult);
            return res.render('g2test', {
                title: 'G2 Test',
                page_name: 'g2test',
                user: user,
                appointment: appointment,
                errors: req.flash('validationErrors'),
                messages: req.flash('')
            });
        } else {
            // Handle user not logged in or redirect to the login page
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
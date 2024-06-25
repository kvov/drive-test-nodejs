const User = require('../models/user');
const Appointment = require('../models/Appointment');
const path = require('path');

module.exports = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await User.findById(req.session.userId);

            // Check if the user has an appointment
            const appointment = await Appointment.findById(user.appointmentId);

            return res.render('gtest', {
                title: 'G Test',
                page_name: 'gtest',
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
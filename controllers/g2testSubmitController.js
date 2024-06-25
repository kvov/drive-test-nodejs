const User = require('../models/user');
const Appointment = require('../models/Appointment');
const path = require('path');


exports.submitDate = async (req, res) => {
    try {
        const { appointmentDate, appointmentTime } = req.body;
        
        // Find the user and update appointment details
        const user = await User.findById(req.session.userId);
        console.log(user);

        // Convert the incoming date to the MM/DD/YYYY format
        const formattedDate = new Date(appointmentDate);
        formattedDate.setUTCHours(12, 0, 0, 0);
        const selectedDate = formattedDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
        // Update the isTimeSlotAvailable flag for the selected appointment
        const updatedAppointment = await Appointment.findOneAndUpdate(
            {
                appointmentDate: selectedDate,
                appointmentTime: appointmentTime
            },
            { $set: { isTimeSlotAvailable: false } },
            { new: true } // To return the updated document
            
        );

        if (!updatedAppointment) {
            req.flash('validationErrors', ["Appointment not found"]);
            return res.redirect('/g2test');
        }

        user.appointmentId = updatedAppointment._id;
        
        await User.updateOne({ _id: req.session.userId }, { $set: { appointmentId: updatedAppointment._id, testType: "G2" } });

        res.redirect('/g2test');
    } catch (error) {
        console.error('Error submitting date and time:', error);
        req.flash('validationErrors', ['Internal Server Error']);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
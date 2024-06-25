const Appointment = require('../models/Appointment');

exports.getAvailableTimeSlots = async (req, res) => {
    try {
        const { date } = req.query;

        // Fetch available time slots from MongoDB for the specified date
        const availableSlots = await Appointment.getAvailableTimeSlots(date);

        // Send the available time slots as JSON response
        res.json({ availableSlots });
    } catch (error) {
        console.error('Error fetching available time slots:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

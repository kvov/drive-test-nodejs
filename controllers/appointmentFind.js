const Appointment = require( "../models/Appointment" )

module.exports = ( req, res ) => {
    const { month, day, year } = req.params
    const appointmentDate = `${ month }/${ day }/${ year }`

    Appointment.find({ appointmentDate: appointmentDate })
    .then(appointment => {
        if (appointment) {
            res.status(200).send({
                appointment
            });
        } else {
            res.status(404).send('File not found');
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

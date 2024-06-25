const Appointment = require( "../models/Appointment" )

module.exports = ( req, res ) => {
    const { appointmentTime, appointmentDate } = req.body

    Appointment.create({
        appointmentTime: appointmentTime,
        appointmentDate: appointmentDate,
    })
        .then(() => {
            req.flash('messages', ["Appointment created successfully."]);
            res.redirect("/admins/appointment");
        })
        .catch(err => {
            req.flash('validationErrors', err.errors
                ? Object.keys(err.errors).map(key => err.errors[key].message)
                : ["Unable to create appointment"]);
            req.flash('data', req.body);
            res.redirect("/admins/appointment");
        });    

}



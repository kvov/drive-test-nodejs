const mongoose = require( "mongoose" )
const uniqueValidator = require( 'mongoose-unique-validator' )

const AppointmentSchema = new mongoose.Schema( {
    appointmentTime: {
        required: [ true, 'Please provide appointment time' ],
        type: String,
    },
    appointmentDate: {
        required: [ true, 'Please provide appointment date' ],
        type: String,
    },
    isTimeSlotAvailable: {
        default: true,
        type: Boolean
    }
    } )

    AppointmentSchema.index( {
    "appointmentTime": 1,
    "appointmentDate": 1
    }, { "unique": true } )

    // Method to fetch available time slots for a given date
AppointmentSchema.statics.getAvailableTimeSlots = async function (date) {
    try {
        const availableSlots = await this.find({
        appointmentDate: date,
        isTimeSlotAvailable: true,
        }).distinct("appointmentTime");

        return availableSlots;
    } catch (error) {
        console.error("Error fetching available time slots:", error);
        return null;
    }
};

    AppointmentSchema.plugin( uniqueValidator, { message: 'Appointment slot already exists' } )

    AppointmentSchema.pre( 'create', function( next ) {
    this.options.runValidators = true
    next()
    } )

    AppointmentSchema.pre( 'findOneAndUpdate', function( next ) {
    this.options.runValidators = true
    next()
    } )

const Appointment = mongoose.model( "Appointment", AppointmentSchema )

module.exports = Appointment

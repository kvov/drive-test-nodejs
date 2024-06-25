const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    }, 
    userType: {
        type: String,
        enum: {
            values: [ "Driver", "Examiner", "Admin" ],
        },
        required: true,
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    firstName: {
        type: String,
        default: "" 
    },
    lastName: {
        type: String,
        default: "" 
    }, 
    licenseNo: {
        type: String,
        default: "" 
    }, 
    age: {
        type: Number,
        default: null 
    },
    carDetails: { 
        make: {
            type: String,
            default: "" 
        }, 
        model: {
            type: String,
            default: "" 
        }, 
        year: {
            type: Number,
            default: null 
        }, 
        platNo: {
            type: String,
            default: "" 
        } 
    },
    testType: {
        type: String
    },
    examinerComment: {
        type: String
    },
    testResult: {
        type: Boolean
    }
    
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
    next()
    })
});


const user = mongoose.model('user', userSchema);
module.exports = user;
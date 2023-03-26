const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentorSchema = new Schema({
    
    email : { type : String},
    password : {type : String},
    otp : {type : String},
    name : {type : String},
    idurl : {type : String},
    toparea : {
        type : [String],
        enum : ['Board Topper', 'JEE Topper', 'Neet Topper', 'Masters','PHD']
    },
    isverify : {type : Boolean},
    ppfurl : {type : String},
    otpverified : {type : Boolean}
})

module.exports = mongoose.model('Mentor', mentorSchema)
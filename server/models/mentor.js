const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mentorSchema = new Schema({
    
    email : { type : String},
    password : {type : String},
    otp : {type : String},
    name : {type : String},
    idurl : [String],
    toparea : {
        type : [String],
        enum : ['Board Topper', 'JEE Topper', 'Neet Topper', 'Masters','PHD']
    },
    isverify : {
        type : Boolean,
        default : false
    },
    ppfurl : {type : String},
    otpverified : {
        type : Boolean,
        default : false
    },
    isreject : {
        type : Boolean,
        default : false
    },
    rejectreason : {
        type: String,
        default: " "
    }
})

module.exports = mongoose.model('Mentor', mentorSchema)
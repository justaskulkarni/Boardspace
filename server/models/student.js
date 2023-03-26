const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({

    email : {type : String},
    password : {type : String},
    phonenum : {
        type : Number,
        min : [1000000000, "Enter a valid Number"],
        max : [9999999999, "Enter a valid Number"]
    },
    stname : {type : String}
})

module.exports = mongoose.model('Student', studentSchema)
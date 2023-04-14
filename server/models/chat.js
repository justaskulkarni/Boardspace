const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema =  new Schema({
    chat : { type : String, trim: true },
    isGroupChat : { type : Boolean, default: false },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
    latestMessage : {type : mongoose.Schema.Types.ObjectId, ref: "Message"},
},{ timestamps: true})

module.exports = mongoose.model('Chat', chatSchema)

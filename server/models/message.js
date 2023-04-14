const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    studentSender: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    mentorSender: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }
    adminSender: { type: mongoose.Schema.Types.ObjectId, ref: "Student" }
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readByStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    readByMentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
    readByAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)
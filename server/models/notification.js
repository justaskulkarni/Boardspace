const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({

    senderName : {type : String},
    senderId : {type : String},
    to : {type : Schema.Types.ObjectId},
    role : {type : String , enum : ['Admin' , 'Student', 'Mentor']}
})

module.exports = mongoose.model('Notification', notificationSchema)
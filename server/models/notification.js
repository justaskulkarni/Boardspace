const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({

    senderName : {type : String},
    senderId : {type : Schema.Types.ObjectId},
    to : {type : String},
    role : {type : String , enum : ['Admin' , 'Student', 'Mentor']}
})

module.exports = mongoose.model('Notification', notificationSchema)
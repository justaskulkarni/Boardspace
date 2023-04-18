const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({

    content : {type : String},
    time : {type : String},
    date : {type: String},
    role : {type: String},
    to : {type: String},
    fromid : { type : Schema.Types.ObjectId},
    fromrole : {type : String , enum : ['Admin' , 'Student', 'Mentor']}
})

module.exports = mongoose.model('Message', messageSchema)
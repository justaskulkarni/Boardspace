const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({

    content : {type : String},
    time : {type : String},
    date : {type: String},
    role : {type: String},
    to : {type: String},
    from : {type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
})

module.exports = mongoose.model('Message', messageSchema)
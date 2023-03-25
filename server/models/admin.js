const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema =  new Schema({
    email : {type : String},
    password : {type : String},
    username : {type : String}
})

module.exports = mongoose.model('Admin',adminSchema)
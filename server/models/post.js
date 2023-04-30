const mongoose = require('mongoose')
const Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')
const DB_URL = process.env.MONGO_URL
var connection = mongoose.createConnection(DB_URL)

const postSchema = new Schema({

    doubtaskedby: {type : Schema.Types.ObjectId, ref: 'Student'},
    hashtag: {type : Number}, 
    imgurl: {type: String},
    caption: {type: String},
    solved: {type: Boolean, default: false}, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

postSchema.plugin(autoIncrement.plugin, { model: 'Post', field: 'hashtag' })
module.exports = mongoose.model('Post', postSchema)
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require("mongoose-auto-increment-updated" )

var connection = mongoose.createConnection(process.env.MONGO_URL)
autoIncrement.initialize(connection)

const postSchema = new Schema({

    doubtaskedby: {type : Schema.Types.ObjectId, ref: 'Student'},
    hashtag: {type : Number}, 
    imgurl: {type: String},
    caption: {type: String},
    solved: {type: Boolean, default: false}, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    tag : {type :String, enum : ['JEE', 'Neet', 'ICSE', 'SSC','IGCSE', 'CBSE', 'ISC', 'IB', 'HSC']}
})

postSchema.plugin(autoIncrement.plugin, {model : 'Post', field: 'hashtag'})
module.exports = mongoose.model('Post', postSchema)
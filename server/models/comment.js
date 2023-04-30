const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({

    commentedby: {type : Schema.Types.ObjectId},
    commentedbyrole: {type : String , enum : ['Admin' , 'Student', 'Mentor']}, 
    content: {type: String},
    postid: {type: Schema.Types.ObjectId, ref: 'Post'}
})

module.exports = mongoose.model('Comment', commentSchema)
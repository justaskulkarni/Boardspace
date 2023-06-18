const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({

    commentedby: {type : Schema.Types.ObjectId, ref : 'Mentor'},
    commentedbyme : {type : Boolean , default : false}, 
    content: {type: String},
    postid: {type: Schema.Types.ObjectId, ref: 'Post'}
}, {timestamps : true})

module.exports = mongoose.model('Comment', commentSchema)
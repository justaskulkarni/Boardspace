const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({

    doubtaskedby: {type : Schema.Types.ObjectId, ref: 'Student'},
    hashtag: {type : Number}, 
    imgurl: {type: String},
    caption: {type: String},
    solved: {type: Boolean, default: false}, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    tag : {type :String, enum : ['JEE', 'Neet', 'Boards','PHD', 'Masters']}
})


module.exports = mongoose.model('Post', postSchema)
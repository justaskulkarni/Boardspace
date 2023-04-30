const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({

    doubtaskedby: {type : Schema.Types.ObjectId, ref: 'Student'},
    hashtag: {type : Number}, 
    imgurl: {type: String},
    caption: {type: String},
    solved: {type: Boolean, default: false}, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
})

postSchema.pre('save', async function(next) {
  try {
    if (this.isNew) {
      const count = await Post.countDocuments({});
      this.hashtag = count + 1;
    }
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Post', postSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    tags: { type: Array },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true }
);

PostSchema.virtual('url').get(function () {
  return '/posts/' + this._id;
});

module.exports = mongoose.model('Post', PostSchema);

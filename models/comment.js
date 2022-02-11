const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    commenter_name: { type: String, required: true },
    commenter_email: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);

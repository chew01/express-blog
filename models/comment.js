const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  post: { type: Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Comment', CommentSchema);

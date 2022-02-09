const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    tags: { type: Array },
    author: { type: Schema.Types.ObjectId, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: 'created_at' }
);

module.exports = mongoose.model('Post', PostSchema);

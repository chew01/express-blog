const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: true }],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPublished: { type: Boolean, required: true },
    hyperlink: { type: String, required: true },
  },
  { timestamps: true }
);

PostSchema.virtual('url').get(function () {
  return '/posts/' + this.hyperlink;
});

module.exports = mongoose.model('Post', PostSchema);

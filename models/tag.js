const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String },
});

TagSchema.virtual('url').get(function () {
  return '/tags/' + this.name;
});

module.exports = mongoose.model('Tag', TagSchema);

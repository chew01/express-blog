exports.getTags = (req, res) => {
  res.send('get tags');
};

exports.createTag = (req, res) => {
  res.send('post tags');
};

exports.getPostsWithTagName = (req, res) => {
  res.send('get tagName ' + req.params.tagName);
};

exports.updateTagWithTagName = (req, res) => {
  res.send('put tagName ' + req.params.tagName);
};

exports.deleteTagWithTagName = (req, res) => {
  res.send('delete tagName ' + req.params.tagName);
};

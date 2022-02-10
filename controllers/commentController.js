exports.getCommentsWithPostId = (req, res) => {
  res.send('get postId comments ' + req.params.postId);
};

exports.createCommentWithPostId = (req, res) => {
  res.send('post postId comments ' + req.params.postId);
};

exports.getCommentWithId = (req, res) => {
  res.send('get commentId ' + req.params.commentId);
};

exports.updateCommentWithId = (req, res) => {
  res.send('put commentId ' + req.params.commentId);
};

exports.deleteCommentWithId = (req, res) => {
  res.send('delete commentId ' + req.params.commentId);
};

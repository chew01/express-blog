exports.getPosts = (req, res) => {
  res.send('get posts');
};

exports.createPost = (req, res) => {
  res.send('post posts');
};

exports.getPostWithId = (req, res) => {
  res.send('get postId ' + req.params.postId);
};

exports.updatePostWithId = (req, res) => {
  res.send('put postId ' + req.params.postId);
};

exports.deletePostWithId = (req, res) => {
  res.send('delete postId ' + req.params.postId);
};

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

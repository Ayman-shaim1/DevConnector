import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id,
  });
  const post = await newPost.save();
  res.json(post);
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
export const getListPost = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ date: -1 });
  res.json(posts);
});

// @desc    Get  posts by Id
// @route   GET /api/posts/:id
// @access  Private
export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found !");
  }
});

// @desc    delete  a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    if (String(post.user) !== String(req.user.id)) {
      res.status(401);
      throw new Error("User not authorized !");
    } else {
      await post.remove();
      res.json({ message: "Post removed !" });
    }
  } else {
    res.status(404);
    throw new Error("Post not found !");
  }
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (
    post.likes.filter((like) => String(like.user) === String(req.user.id))
      .length > 0
  ) {
    res.status(400);
    throw new Error("Post already liked");
  }
  post.likes.unshift({ user: req.user.id });
  await post.save();

  res.json(post.likes);
});

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
export const unlikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  // Check if the post has already been liked
  if (
    post.likes.filter((like) => String(like.user) === String(req.user.id))
      .length === 0
  ) {
    res.status(400);
    throw new Error("Post has not yet been liked");
  } else {
    const removeIndex = post.likes
      .map((like) => String(like.user))
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  }
});

// @desc    Add comment to post
// @route   POST /api/posts/comment/:id
// @access  Private
export const addCommentToPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const post = await Post.findById(req.params.id);

  if (user) {
    if (post) {
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } else {
      res.status(404);
      throw new Error("Post not found !");
    }
  } else {
    res.status(401);
    throw new Error("User not authorized !");
  }
});

// @desc    Delete comment from post
// @route   POST /api/posts/comment/:id/comment_id
// @access  Private
export const removeCommentFromPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // Pull out comment :
  const comment = post.comments.find(
    (comment) => String(comment._id) === String(req.params.comment_id)
  );
  // Make sure comment exsists :
  if (comment) {
    // Check user :
    if (String(comment.user) !== String(req.user.id)) {
      res.status(401);
      throw new Error("User not authorized !");
    } else {
      // Get removed id :
      const removedIndex = post.comments
        .map((comment) => String(comment.user))
        .indexOf(req.user.id);

      post.comments.splice(removedIndex, 1);
      await post.save();
      res.json(post.comments);
    }
  } else {
    res.status(404);
    throw new Error("Comment does not exist !");
  }
});

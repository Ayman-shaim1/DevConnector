import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  resetLikePost,
  likePost,
  resetUnlikePost,
  unLikePost,
  resetRemovePost,
  removePost,
} from "../redux/post/postActions";
import Moment from "react-moment";

const PostItem = ({ post }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postLike = useSelector((state) => state.postLike);
  const { success: successPostLike, error: errorPostLike } = postLike;

  const postUnlike = useSelector((state) => state.postUnlike);
  const { success: successPostUnlike, error: errorPostUnlike } = postUnlike;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: successPostDelete, error: errorPostDelete } = postDelete;

  const likePostHandler = () => {
    dispatch(likePost(post._id));
  };

  const unLikePostHandler = () => {
    dispatch(unLikePost(post._id));
  };

  const deletePostHandler = () => {
    dispatch(removePost(post._id));
  };

  React.useEffect(() => {
    if (errorPostUnlike) {
      dispatch(resetUnlikePost());
    }
    if (errorPostLike) {
      dispatch(resetLikePost());
    }
    if (errorPostDelete) {
      dispatch(resetRemovePost());
      setAlert(errorPostDelete, "danger");
    }
    if (successPostLike) {
      dispatch(resetLikePost());
    }
    if (successPostUnlike) {
      dispatch(resetUnlikePost());
    }
    if (successPostDelete) {
      dispatch(resetRemovePost());
    }
  }, [
    dispatch,
    post,
    errorPostDelete,
    successPostDelete,
    userInfo,
    successPostLike,
    successPostUnlike,
    errorPostLike,
    errorPostUnlike,
  ]);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY-MM-DD">{post.date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={likePostHandler}>
          <i className="fas fa-thumbs-up"></i>
          <span> {post.likes.length}</span>
        </button>
        <button
          disabled={post.likes.length === 0 ? true : false}
          type="button"
          className="btn btn-light"
          onClick={unLikePostHandler}>
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          <span className="comment-count">{post.comments.length}</span>
        </Link>
        {userInfo && userInfo._id === post.user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deletePostHandler}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;

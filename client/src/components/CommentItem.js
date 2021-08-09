import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  resetDeleteCommentFromPost,
  deleteCommentFromPost,
} from "../redux/post/postActions";

const CommentItem = ({ comment, idPost }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDeleteComment = useSelector((state) => state.postDeleteComment);
  const { success, error } = postDeleteComment;

  const deleteCommentHandler = () => {
    dispatch(deleteCommentFromPost(idPost, comment._id));
  };
  React.useEffect(() => {
    if (error) {
      dispatch(setAlert(error, "danger"));
      dispatch(resetDeleteCommentFromPost());
    }
    if (success) {
      dispatch(resetDeleteCommentFromPost());
    }
  }, [success, error, dispatch]);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{comment.date}</Moment>
        </p>
        {userInfo && userInfo._id === comment.user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteCommentHandler}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  getByIdPost,
  resetGetByIdPost,
  commentPost,
  resetCommentPost,
} from "../redux/post/postActions";
import Spinner from "../components/Spinner";
import CommentItem from "../components/CommentItem";

const PostPage = ({ history, match }) => {
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postById = useSelector((state) => state.postById);
  const {
    loading: loadingPostById,
    success: successPostById,
    error: errorPostById,
    post,
  } = postById;

  const postAddComment = useSelector((state) => state.postAddComment);
  const {
    loading: loadingPostAddComment,
    success: successPostAddComment,
    error: errorPostAddComment,
  } = postAddComment;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(commentPost(post._id, text));
  };

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
    if (errorPostById) {
      dispatch(setAlert(errorPostById, "danger"));
    }
    if (!successPostById && !errorPostById) {
      dispatch(getByIdPost(match.params.id));
    }

    if (post) {
      if (String(match.params.id) !== String(post._id)) {
        dispatch(resetGetByIdPost());
        dispatch(getByIdPost(match.params.id));
      }
    }
    if (errorPostAddComment) {
      dispatch(resetCommentPost());
      dispatch(setAlert(errorPostAddComment, "danger"));
    }
    if (successPostAddComment) {
      dispatch(resetCommentPost());
      setText("");
    }
  }, [
    history,
    dispatch,
    match,
    successPostAddComment,
    errorPostAddComment,
    userInfo,
    post,
    errorPostById,
    successPostById,
  ]);

  return (
    <React.Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      {loadingPostById && <Spinner />}
      {post && (
        <React.Fragment>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>
          {loadingPostAddComment && <Spinner />}
          <div className="post-form">
            <div className="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={submitHandler}>
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>

          <div className="comments">
            {post &&
              post.comments.length !== 0 &&
              post.comments.map((comment) => (
                <CommentItem
                  comment={comment}
                  key={comment._id}
                  idPost={post._id}
                />
              ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PostPage;

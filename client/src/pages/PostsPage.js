import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../redux/alert/alertActions";
import {
  getListPost,
  resetCreatePost,
  createPost,
  resetListPost,
} from "../redux/post/postActions";

import PostItem from "../components/PostItem";
import Spinner from "../components/Spinner";

const PostsPage = ({ history }) => {
  const [text, setText] = React.useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector((state) => state.postList);
  const {
    loading: loadingPostList,
    error: errorPostList,
    success: successPostList,
    posts,
  } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingPostCreate,
    error: errorPostCreate,
    success: successPostCreate,
  } = postCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost(text));
  };

  React.useEffect(() => {
    if (!errorPostList && !successPostList) {
      dispatch(resetListPost());
      dispatch(getListPost());
    }
    if (errorPostList) {
      dispatch(setAlert(errorPostList, "danger"));
    }

    if (errorPostCreate) {
      dispatch(resetCreatePost());
      dispatch(setAlert(errorPostCreate, "danger"));
    }

    if (successPostCreate) {
      dispatch(resetCreatePost());
      dispatch(setAlert("Post added successfully", "success"));
      setText("");
    }

    if (!userInfo) {
      history.push("/");
    }
  }, [
    userInfo,
    history,
    dispatch,
    errorPostList,
    successPostList,
    errorPostCreate,
    successPostCreate,
  ]);
  return (
    <React.Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        {loadingPostCreate && <Spinner />}
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={submitHandler}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Create a post"
            required></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {loadingPostList && <Spinner />}
      <div className="posts">
        {posts &&
          posts.length !== 0 &&
          posts.map((post) => <PostItem post={post} key={post._id} />)}
      </div>
    </React.Fragment>
  );
};

export default PostsPage;

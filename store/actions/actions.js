//action types for getting all posts
export const GET_POSTS_COMMENTS_START = "GET_POSTS_COMMENTS_START";
export const GET_POSTS_COMMENTS_SUCCESS = "GET_POSTS_COMMENTS_SUCCESS";
export const GET_POSTS_COMMENTS_FAIL = "GET_POSTS_COMMENTS_FAIL";

export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_ERROR = "DELETE_POST_ERROR";

export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAIL = "POST_FAIL";

export const getPosts = (postsOrComments, postId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_POSTS_COMMENTS_START });
      let response;
      let posts;
      let comments;
      if (postsOrComments === 0) {
        response = await fetch("https://jsonplaceholder.typicode.com/posts");
        posts = await response.json();
      } else {
        response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        comments = await response.json();
      }

      dispatch({
        type: GET_POSTS_COMMENTS_SUCCESS,
        payload: {
          postsOrCommentsData: postsOrComments === 0 ? posts : comments,
          postsOrComments: postsOrComments,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_POSTS_COMMENTS_FAIL,
        payload: { postsOrComments: postsOrComments, error: error },
      });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_POST_SUCCESS, payload: postId });
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      dispatch({ type: DELETE_POST_ERROR, payload: error });
    }
  };
};

export const addNewPost = (post) => {
  return async (dispatch, getState) => {
    try {
      const currentPostsLength = getState().posts.length;
      post.id = currentPostsLength + 1;
      dispatch({ type: POST_START });
      await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        body: JSON.stringify(post),
      });
      dispatch({ type: POST_SUCCESS, payload: post });
    } catch (error) {
      dispatch({ type: POST_FAIL, payload: error });
    }
  };
};

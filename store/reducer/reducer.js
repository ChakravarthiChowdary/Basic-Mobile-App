const {
  GET_POSTS_COMMENTS_START,
  GET_POSTS_COMMENTS_SUCCESS,
  GET_POSTS_COMMENTS_FAIL,
  DELETE_POST_SUCCESS,
  POST_START,
  POST_SUCCESS,
  POST_FAIL,
} = require("../actions/actions");

const initialState = {
  loading: false,
  posts: [],
  postsError: null,
  commentsError: null,
  comments: [],
  addError: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_COMMENTS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_COMMENTS_SUCCESS:
      if (action.payload.postsOrComments === 0) {
        return {
          ...state,
          loading: false,
          posts: action.payload.postsOrCommentsData,
        };
      } else {
        return {
          ...state,
          loading: false,
          comments: action.payload.postsOrCommentsData,
        };
      }
    case GET_POSTS_COMMENTS_FAIL:
      if (action.payload.postsOrComments === 0) {
        return {
          ...state,
          loading: false,
          postsError: action.payload.error,
        };
      } else {
        return {
          ...state,
          loading: false,
          commentsError: action.payload.error,
        };
      }
    case DELETE_POST_SUCCESS:
      const updatedPosts = state.posts.filter(
        (post) => post.id !== action.payload
      );
      return {
        ...state,
        posts: updatedPosts,
      };
    case POST_START:
      return {
        ...state,
        loading: true,
      };
    case POST_SUCCESS:
      const addedPosts = state.posts.concat(action.payload);
      return {
        ...state,
        loading: false,
        posts: addedPosts,
      };
    case POST_FAIL:
      return {
        ...state,
        loading: false,
        addError: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

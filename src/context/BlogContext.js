import jsonServer from "../api/json-server";
import createDataContext from "./createDataContext";

//action === {type: 'add_post' | 'delete_post' | 'get_posts', payload: state.id}
const blogReducer = (blogPosts, action) => {
  switch (action.type) {
    case "add_post":
      return !blogPosts.find((post) => action.payload.id === post.id)
        ? [...blogPosts, action.payload]
        : [...blogPosts].map((post) =>
            post.id === action.payload.id ? action.payload : post
          );
    case "delete_post":
      return blogPosts.filter((post) => post.id !== action.payload);
    case "get_posts":
      return [...action.payload];
    default:
      return [...blogPosts];
  }
};

//actions
const addPost = (dispatch) => {
  return async (post, onFinish) => {
    try {
      const response = await jsonServer.post("/notes", {
        title: post.title,
        description: post.description,
        date: post.date,
      });
      dispatch({ type: "add_post", payload: post });
      onFinish();
    } catch (e) {
      console.error("AddPost stated an error!", e);
    }
  };
};
const deletePost = (dispatch) => {
  return async (id, onFinish) => {
    try {
      const response = await jsonServer.delete(`/notes/${id}`);

      dispatch({ type: "delete_post", payload: id });
      onFinish();
    } catch (e) {
      console.error("DeletePost stated an error!", e);
    }
  };
};
const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const response = await jsonServer.get("/notes");
      dispatch({ type: "get_posts", payload: response.data });
    } catch (e) {
      console.error("GetBlogPosts stated an error!", e);
    }
  };
};

const editPost = (dispatch) => {
  return async (post, onFinish) => {
    try {
      const response = await jsonServer.put(`/notes/${post.id}`, {
        id: post.id,
        title: post.title,
        description: post.description,
        date: post.date,
      });
      dispatch({ type: "add_post", payload: response.data });
      onFinish();
    } catch (e) {
      console.error("PutBost stated an error!", e);
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addPost, deletePost, getBlogPosts, editPost },
  []
);

import createDataContext from "./createDataContext";

//action === {type: 'add_post', payload: state.id}
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
    default:
       return [...blogPosts];
  }
};

//actions
const addPost = (dispatch) => {
  return (post) => {
    dispatch({ type: "add_post", payload: post });
  };
};
const deletePost = (dispatch) => {
  return (id) => {
    console.log("delete was called");
    dispatch({ type: "delete_post", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addPost, deletePost },
  []
);

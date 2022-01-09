import * as blogService from '../../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'ADD_BLOG':
      return [...state, action.data];
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case 'ADD_COMMENT':
      console.log(action);
      return state.map((blog) =>
        blog.id === action.id
          ? { ...blog, comments: [...blog.comments, action.data] }
          : blog
      );
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
    default:
      return state;
  }
};

export const initBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({
    type: 'INIT',
    data: blogs,
  });
};

export const addBlog = (newBlog) => async (dispatch) => {
  const createdBlog = await blogService.create(newBlog);
  dispatch({
    type: 'ADD_BLOG',
    data: createdBlog,
  });
};

export const updateBlog = (blog) => async (dispatch) => {
  const updatedBlog = await blogService.update(blog);
  dispatch({
    type: 'UPDATE_BLOG',
    data: updatedBlog,
  });
};

export const addComment = (id, comment) => async (dispatch) => {
  const newComment = await blogService.createComment(id, comment);
  dispatch({
    type: 'ADD_COMMENT',
    data: newComment,
    id,
  });
};

export const removeBlog = (id) => async (dispatch) => {
  await blogService.remove(id);
  dispatch({
    type: 'DELETE_BLOG',
    id,
  });
};

export default blogReducer;

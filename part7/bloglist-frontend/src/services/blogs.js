import axios from 'axios';
const baseUrl = '/api/blogs';

let token;

export const setToken = (newToken) => (token = `bearer ${newToken}`);

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

export const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
  return response.data;
};

export const createComment = async (id, content) => {
  console.log('---id---:', id, 'comment', { content });
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content });
  console.log(response);
  return response.data;
};

export const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

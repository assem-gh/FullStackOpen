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

export const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  return response.data;
};

export const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};
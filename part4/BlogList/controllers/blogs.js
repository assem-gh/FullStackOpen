const blogesRouter = require('express').Router();
const Blog = require('../models/Blog');

blogesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogesRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  const newBlog = await blog.save();
  res.status(201).json(newBlog);
});

blogesRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByIdAndDelete(id);
  res.status(204).end();
});

blogesRouter.put('/:id', async (req, res) => {
  const blog = {
    ...req.body,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogesRouter;

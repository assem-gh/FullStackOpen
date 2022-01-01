const jwt = require('jsonwebtoken');
const blogesRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const { userExtractor } = require('../utils/middleware');

blogesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1 });
  res.json(blogs);
});

blogesRouter.post('/', userExtractor, async (req, res) => {
  const user = req.user;
  if (!user)
    return res.status(401).json({
      error: 'Unauthorized Token is missing',
    });
  const { title, url, author, likes } = req.body;
  const blog = new Blog({
    title,
    url,
    likes,
    author,
    user: user.id,
  });

  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog.id);
  await user.save();
  res.status(201).json(newBlog);
});

blogesRouter.delete('/:id', async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token)
    return res.status(401).json({
      error: 'Unauthorized Token is missing',
    });

  const user = await User.findById(decodedToken.id);
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!(blog.user.toString() === user.id))
    return res.status(401).json({
      error: 'Unauthorized',
    });
  await Blog.findByIdAndDelete(id);
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

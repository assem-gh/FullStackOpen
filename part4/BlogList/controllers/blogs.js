const jwt = require('jsonwebtoken');
const blogesRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const Comment = require('../models/Comment');
const { userExtractor } = require('../utils/middleware');

blogesRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { userName: 1, name: 1 })
    .populate('comments');
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
  await Blog.populate(newBlog, { path: 'user', select: 'userName name id' });
  res.status(201).json(newBlog);
});

blogesRouter.post('/:id/comments', async (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  const comment = new Comment({ content: req.body.content });
  const newComment = await comment.save();
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: newComment.id } },
    { new: true, upsert: true }
  );

  console.log(blog.comments);

  res.status(201).json(newComment);
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
  }).populate('user', { userName: 1, id: 1, name: 1 });
  res.json(updatedBlog);
});

module.exports = blogesRouter;

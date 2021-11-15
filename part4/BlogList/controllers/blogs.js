const blogesRouter = require('express').Router()
const Blog = require('../models/Blog')

blogesRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogesRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((result) => {
    res.status(201).json(result)
  })
})

module.exports = blogesRouter

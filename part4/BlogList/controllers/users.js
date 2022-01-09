const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const body = req.body;
  const saltRounds = 12;
  if (!body.password)
    return res.status(400).json({
      error: 'Password missing ',
    });
  if (!(body.password.length >= 3))
    return res.status(400).json({
      error: 'Password must be at least 3',
    });
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    userName: body.userName,
    name: body.name,
    password: passwordHash,
  });
  const savedUser = await user.save();
  return res.json(savedUser);
});

module.exports = userRouter;



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ userName: body.userName });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid Username or Password' });
  }

  const userForToken = {
    userName: user.userName,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({
    token,
    userName: user.userName,
    name: user.name,
    id: user.id,
  });
});

module.exports = loginRouter;

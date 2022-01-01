const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');


beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('password', 12);
  const user = new User({
    userName: 'test',
    name: 'test',
    password: passwordHash,
  });

  await user.save();
});

describe('Invalid User ', () => {
  test('missing username ', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      name: 'test',
      password: 'password',
    };

    const response = await api
      .post('/api/users/')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400);

    const err = response.body.error;
    expect(err).toContain('User validation failed');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('unique username', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      userName: 'test',
      name: 'test',
      password: 'password',
    };

    const response = await api
      .post('/api/users/')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400);
    const err = response.body.error;
    expect(err).toContain('expected `userName` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('missing password', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      userName: 'test-password',
      name: 'test-password',
    };
    const response = await api
      .post('/api/users/')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400);
    const err = response.body.error;
    expect(err).toContain('Password missing');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test('Password length less than 3', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      userName: 'test-password',
      name: 'test-password',
      password: 'pa',
    };
    const response = await api
      .post('/api/users/')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(400);
    const err = response.body.error;
    expect(err).toContain('Password must be at least 3');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
afterAll(() => {
  mongoose.connection.close();
});

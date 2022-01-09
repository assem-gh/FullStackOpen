const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');
const User = require('../models/User');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('when there is initially some blogs saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.blogs.length);
  });
  test('blog has a unique  identifier named "id" ', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

describe('Addition of a new Blog', () => {
  let token;

  beforeEach(async () => {
    await User.deleteMany({});
    const user = {
      userName: 'test',
      name: 'test',
      password: 'password',
    };
    await api.post('/api/users').send(user);
    const response = await api
      .post('/api/login')
      .send({ userName: user.userName, password: user.password });
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });

  test('add new blog', async () => {
    const blogToAdd = {
      title: 'Testing the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const startLength = helper.blogs.length;
    const response = await api.get('/api/blogs');
    const contents = response.body.map((blog) => blog.title);
    expect(response.body).toHaveLength(startLength + 1);
    expect(contents).toContain('Testing the backend');
  });

  test('add new blog without token', async () => {
    const blogToAdd = {
      title: 'Testing the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      likes: 1,
    };
    const response = await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const err = response.body.error;
    expect(err).toContain('Unauthorized');
  });

  test('likes property default to 0', async () => {
    const blogToAdd = {
      title: 'Testing the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    };
    const response = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const newBlog = response.body;
    expect(newBlog.likes).toBe(0);
  });
  test('status 400 when missing title and url', async () => {
    const blogToAdd = {
      author: 'fullstackopen',
    };
    const response = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blogToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('Deletion of a  Blog', () => {
  const user1 = {
    userName: 'User1',
    name: 'user1',
    password: 'password',
  };
  const user2 = {
    userName: 'User2',
    name: 'user2',
    password: 'password',
  };

  let token;
  let user1NewBlog;

  beforeEach(async () => {
    await User.deleteMany({});

    await api.post('/api/users').send(user1);
    await api.post('/api/users').send(user2);

    const blog = {
      title: 'user1 test',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    };

    const response = await api
      .post('/api/login')
      .send({ userName: user1.userName, password: user1.password });
    expect(response.body.token).toBeDefined();
    token = response.body.token;

    const user1Response = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blog)
      .expect(201);
    user1NewBlog = user1Response.body;
    expect(user1NewBlog.title).toBe('user1 test');
  });
  test('delete exist blog from different user', async () => {
    const response = await api
      .post('/api/login')
      .send({ userName: user2.userName, password: user2.password });
    expect(response.body.token).toBeDefined();
    token = response.body.token;
    await api
      .delete(`/api/blogs/${user1NewBlog.id}`)
      .auth(token, { type: 'bearer' })
      .expect(401);
  });

  test('delete exist blog with logged in user ', async () => {
    const response = await api
      .post('/api/login')
      .send({ userName: user1.userName, password: user1.password });
    expect(response.body.token).toBeDefined();
    token = response.body.token;
    await api
      .delete(`/api/blogs/${user1NewBlog.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close;
});

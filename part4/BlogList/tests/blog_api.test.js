const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const helper = require('./test_helper');

const Blog = require('../models/blog');

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
  test('add new blog', async () => {
    const blogToAdd = {
      title: 'Testing the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const startLength = helper.blogs.length;
    const response = await api.get('/api/blogs');
    const contents = response.body.map((blog) => blog.title);
    expect(response.body).toHaveLength(startLength + 1);
    expect(contents).toContain('Testing the backend');
  });
  test('likes property default to 0', async () => {
    const blogToAdd = {
      title: 'Testing the backend',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
    };
    const response = await api
      .post('/api/blogs')
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
      .send(blogToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});



afterAll(() => {
  mongoose.connection.close;
});

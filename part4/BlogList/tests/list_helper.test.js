const listHelper = require('../utils/list_helper').blogs;
const blogs = require('./test_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];
  test('when list empty', () => {
    const emptyBlogs = [];
    const result = listHelper.totalLikes(emptyBlogs);
    expect(result).toBe(0);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('when list has multiple blogs , return sum of all likes', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('when list empty', () => {
    const emptyBlogs = [];
    const result = listHelper.favoriteBlog(emptyBlogs);
    expect(result).toEqual({});
  });
  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('Author has the largest amount of blogs', () => {
  test('when list empty', () => {
    const emptyBlogs = [];
    const result = listHelper.mostBlogs(emptyBlogs);
    expect(result).toEqual({});
  });
  test('when list has multiple blog', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Author with most Blog likes', () => {
  test('when list empty', () => {
    const emptyBlogs = [];
    const result = listHelper.mostLikes(emptyBlogs);
    expect(result).toEqual({});
  });
  test('when list has multiple blog', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});

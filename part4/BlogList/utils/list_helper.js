const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  const [{ _id, url, __v, ...initialValue }, ...rest] = blogs;

  return blogs.reduce(
    (acc, blog) =>
      blog.likes > acc.likes
        ? { title: blog.title, author: blog.author, likes: blog.likes }
        : acc,
    initialValue
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  return Object.entries(_.countBy(blogs, (blog) => blog.author)).reduce(
    (acc, [key, value]) => {
      return value > acc.blogs ? { author: key, blogs: value } : acc;
    },
    { author: '', blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  return Object.entries(
    blogs.reduce((acc, blog) => {
      if (acc[blog.author]) acc[blog.author] += blog.likes;
      else acc[blog.author] = blog.likes;
      return acc;
    }, {})
  ).reduce(
    (acc, [key, value]) => {
      return value > acc.likes ? { author: key, likes: value } : acc;
    },
    { author: '', likes: 0 }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

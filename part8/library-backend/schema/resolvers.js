const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET;

const {
  UserInputError,
  AuthenticationError,
} = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');

const Book = require('../models/Book');
const Author = require('../models/Author');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      try {
        let query = {};
        if (author && genre) query = { author, genres: { $in: [genre] } };
        if (author) query = { author: author };
        if (genre) query = { genres: { $in: [genre] } };
        const books = await Book.find(query).populate('author');
        return books;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: { author, genre },
        });
      }
    },
    allAuthors: async () => await Author.find({}),

    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        newAuthor = new Author({ name: args.author });
        try {
          author = await newAuthor.save();
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args.name,
          });
        }
      }
      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: author._id,
        });
        const newBook = await book.save();
        author.books = author.books.concat(book._id);
        author.save();
        await Book.populate(newBook, { path: 'author' });

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
        console.log(newBook);
        return newBook;
      } catch (err) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        );
        if (!author) throw new Error('Author not found');
        return author;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        await user.save();
        return user;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args, context) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'superpass') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = resolvers;

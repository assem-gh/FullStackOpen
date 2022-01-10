const { ApolloServer, gql } = require('apollo-server');
const { authors, books } = require('./data');

const typeDefs = gql`
  type Book {
    title: String!
    author: String!
    published: Int
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, { author, genre }) => {
      if (author && genre)
        return books.filter(
          (book) => book.author === author && book.genres.includes(genre)
        );
      if (author) return books.filter((book) => book.author === author);
      if (genre) return books.filter((book) => book.genres.includes(genre));
      return books;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: (root, args) => {
      const author = authors.find((author) => author.name === args.author);
      if (!author) {
        const newAuthor = { name: args.author };
        authors.push(newAuthor);
      }
      const newBook = { ...args };
      books.push(newBook);
      return newBook;
    },
    editAuthor: (root, { name, setBornTo }) => {
      const author = authors.find((author) => author.name === name);
      if (!author) return null;
      author.born = setBornTo;
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

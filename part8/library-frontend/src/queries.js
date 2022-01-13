import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query allBooks($author: ID, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`;
export const ADD_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $author: String!
    $genres: [String]!
    $published: Int!
  ) {
    addBook(
      title: $title
      author: $author
      genres: $genres
      published: $published
    ) {
      title
      author {
        name
        id
        born
      }
      published
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const GET_USER = gql`
  query Me {
    me {
      username
      favoriteGenre
      id
    }
  }
`;
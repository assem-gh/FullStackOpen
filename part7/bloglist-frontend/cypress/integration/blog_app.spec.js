const { func } = require('prop-types');

/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5000/api/testing/reset');
    const user = {
      userName: 'superuser',
      name: 'superuser',
      password: 'superpassword',
    };
    cy.addNewUser(user);
  });

  it('Login form is shown', function () {
    cy.contains('blogs');
    cy.get('form').find('button');
    cy.get('#userName');
    cy.get('#password');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.get('#userName').type('superuser');
      cy.get('#password').type('superpassword');
      cy.get('#loginBtn').click();
      cy.get('.notification.success')
        .should('contain', 'superuser logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    it('fails with wrong credentials', function () {
      cy.get('#userName').type('user');
      cy.get('#password').type('password');
      cy.get('#loginBtn').click();
      cy.get('.notification.error')
        .should('contain', 'Wrong Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ userName: 'superuser', password: 'superpassword' });
      cy.createBlog({
        title: 'Test Blog',
        author: 'super tester',
        url: 'https://test-blog.com',
      });
    });

    it('A blog can be created', function () {
      cy.contains('Create new Blog').click();
      cy.get('#title').type('Test Create new blog');
      cy.get('#author').type('super tester');
      cy.get('#url').type('https://test.com');
      cy.get('form').find('button').click();
      cy.contains('Test Create new blog');
    });

    it('User can like a blog', function () {
      cy.get('html').should('contain', 'Test Blog').as('blog');
      cy.get('@blog').find('button').contains('view').click();
      cy.get('@blog').find('button').contains('like').click();
      cy.get('.likesCount').should('contain', 'likes: 1');
    });

    it('Only user who created the blog can delete it', function () {
      cy.createBlog({
        title: 'test delete by owner',
        author: 'Cypress tester',
        url: 'https://delete-blog.com',
      });
      cy.contains('test delete by owner').parent().parent().as('blogToDelete');
      cy.get('@blogToDelete').find('button').contains('view').click();
      cy.get('@blogToDelete').find('button').contains('remove').click();
      cy.get('.notification.success')
        .should('contain', 'test delete by owner successfuly deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');
    });

    it("user can't delete blogs didn't create", function () {
      cy.createBlog({
        title: 'test delete by owner',
        author: 'Cypress tester',
        url: 'https://delete-blog.com',
      });
      cy.contains('Logout').click();
      cy.addNewUser({
        userName: 'newUser',
        name: 'new user',
        password: 'password',
      });
      cy.login({ userName: 'newUser', password: 'password' });
      cy.contains('test delete by owner').parent().parent().as('blogToDelete');
      cy.get('@blogToDelete').find('button').contains('view').click();
      cy.get('@blogToDelete')
        .find('button')
        .contains('remove')
        .should('not.exist');
    });
  });
  describe('Blogs order', function () {
    const blogs = [
      {
        title: 'Most',
        author: 'first',
        likes: 10,
        url: 'https://first.com',
      },
      {
        title: 'second',
        author: 'second',
        likes: 8,
        url: 'https://second.com',
      },
      {
        title: 'third',
        author: 'third',
        likes: 5,
        url: 'https://third.com',
      },
      {
        title: 'last',
        author: 'last',
        url: 'https://last.com',
      },
    ];
    it('according to likes from the most', function () {
      cy.login({ userName: 'superuser', password: 'superpassword' });
      blogs.forEach((blog) => cy.createBlog(blog));
      cy.get('div.blog-container strong').then((titles) => {
        cy.get(titles[0]).should('contain', 'Most');
        cy.get(titles[1]).should('contain', 'second');
        cy.get(titles[2]).should('contain', 'third');
        cy.get(titles[3]).should('contain', 'last');
      });
    });
  });
});

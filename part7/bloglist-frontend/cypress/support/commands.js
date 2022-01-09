/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ userName, password }) => {
  cy.request('POST', 'http://localhost:5000/api/login', {
    userName,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

//
Cypress.Commands.add('createBlog', (newBlog) => {
  cy.request({
    url: 'http://localhost:5000/api/blogs',
    method: 'POST',
    body: newBlog,
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('addNewUser', (user) => {
  cy.request('POST', 'http://localhost:5000/api/users', user);
  cy.visit('http://localhost:3000');
});

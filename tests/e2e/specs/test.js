// https://docs.cypress.io/api/introduction/api.html

describe('Login page', () => {
  it('Log-in to admin panel', () => {
    cy.visit('/login')
    cy.get('input[type=email]')
      .type('aaaa')
    cy.get('input[type=password]')
      .type('****')
    cy.contains('button')
      .click()
  })
})
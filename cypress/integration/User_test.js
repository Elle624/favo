
describe('Testing homepage', () => {
  
  it("Landing on the homepage with on load", () => {
    cy.visit('http://localhost:3000/')

    cy.get('.username')
      .contains('Wheezy Joe')

    cy.get('.profile-picture')
      .should('have.css', 'background-image', 'url("https://randomuser.me/api/portraits/men/52.jpg")')

    cy.get('.star-image').should('have.length', 5)

    cy.get('.sidebar-titles').contains('Total Hours Volunteered')
      .get('.sidebar-titles').contains('My Upcoming Jobs')
      .get('.section-line').should('have.length', 2)

    cy.get('.hours-bar').contains('10.2 Hours')
  })
})


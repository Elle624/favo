
describe('Testing homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it("Landing on the homepage you can see user sidebar with all user basic information", () => {

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3001/users/1'
    }, {
      statusCode: 201,
      body: {
        
              id: 1,
              name: "Peach Perfect",
              rating: 1.4,
              profilePicture: 'https://randomuser.me/api/portraits/men/52.jpg',
              volunteeredHours: 8.2,
              upcomingJobs: [
                {
                  id: '1-posting-23',
                  eventName: 'Help students to have a dinner',
                  positionName: 'cook',
                  date: '2021/03/01'
                }
              ]  
      }
    })

    cy.get('.username')
      .contains('Peach Perfect')

    cy.get('.profile-picture')
      .should('have.css', 'background-image', 'url("https://randomuser.me/api/portraits/men/52.jpg")')

    cy.get('.star-image').should('have.length', 5)

    cy.get('.sidebar-titles').contains('Total Hours Volunteered')
      .get('.sidebar-titles').contains('My Upcoming Jobs')
      .get('.section-line').should('have.length', 2)

    cy.get('.hours-bar').contains('8.2 Hours')
  })
})


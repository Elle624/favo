import _mockData from "./_ mockData";

describe("Testing the single event details page", () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000/postings/event-1');

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "http://localhost:3001/events/event-1",
    //   },
    //   {
    //     statusCode: 201,
    //     body: _mockData.events[0],
    //   }
    // );
  })

  it('should render correctly', () => {
    cy.visit('http://localhost:3000/');
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/events",
      },
      {
        statusCode: 201,
        body: _mockData.events,
      }
    );
    cy.get(".posting-wrapper")
    // .contains("Something Crazy")
    // .click()

    //cy.visit('http://localhost:3000/postings/event-1');
    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "http://localhost:3001/events/event-1",
    //   },
    //   {
    //     statusCode: 201,
    //     body: _mockData.events[0],
    //   }
    // );
    // cy.get(".posting-detail")
      // .should("contain", "Something Crazy")
      // .and("contain", "Something Else, LLC")
      // .and("contain", 3)
      // .and("contain", "2021/02/01");
  })

})
import _mockData from "./_ mockData";

describe("Testing the single event details page", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/postings/event-1');
    
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/events/event-1",
      },
      {
        statusCode: 201,
        body: _mockData.events[0],
      }
    );
  })

  it("should render event details correctly", () => {
    cy.get(".postings-container")
      .should("contain", "Something Crazy")
      .and("contain", "Description")
      .and("contain", "Something crazy happening somewhere in the somewhere of somewhere CO. Come do something with someone.")
      .and("contain", "Open Positions")
      .and("contain", "Feb 01 2021")
      .and("contain", "Organization")
      .and("contain", "Something Else, LLC")
      .and("contain", "Category")
      .and("contain", "Something")
      .and("contain", "Location")
      .and("contain", "123 Something Dr., Somewhere, CO, 00000")
      .and("contain", "Duration")
      .and("contain", "10")
  })

  it("Single event page header", () => {
    cy.get(".postings-title-wrapper")
      .should("contain","Event Details")
      .and(
        "have.css",
        "background-color",
        "rgb(46, 196, 182)"
        )
  });

  it("Return to home page button should display and function", () => {
    cy.get(".back-button-img")
      .should("be.visible")
      .click();

    // Should stub response, but it's not working yet

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "http://localhost:3001/events/",
    //   },
    //   {
    //     statusCode: 201,
    //     body: _mockData.events,
    //   }
    // );

    cy.url().should("include", "/")
  })


})
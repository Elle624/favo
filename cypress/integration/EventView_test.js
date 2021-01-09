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

  afterEach(() => {
 
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

  it.only("Should display upcoming jobs and able to sign up", () => {
    cy.get(".posting-position-cards-wrapper")
      .should("contain", "assisting with check-in")
      .and("contain", "Open Spots: 3")
      .and("contain", "tossing color")
      .and("contain", "Open Spots: 5")
      .and("contain", "handing out water")
      .and("contain", "Open Spots: 6");

    cy.get(".posting-positions-card:first")
    .focus()
    .should("have.css", "box-shadow", "rgb(46, 196, 182) 2px 2px 3px 0px");

    cy.get(".posting-positions-card:first")
    .click()
    .get(".submit-button")
    .should("contain", "Sign me up!")
    .click();

    cy.intercept(
      {
        method: "PATCH",
        url: "http://localhost:3001/events/event-1",
      },
      {
        statusCode: 201,
        body: {jobId: "posting-1"},
      }
    )
    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/users/1",
      },
      {
        statusCode: 201,
        body: {
          id: "1-posting-1",
          eventId: "event-1",
          eventName: "Something Crazy",
          positionName: "assisting with check-in",
          date: "2021/02/01"
        },
      }
    );
    
    cy.get(".submit-button").should("be.disabled")
    // cy.get(".event-job-title:first")
      //.should("contain", "Open Spots: 2")
  })


})
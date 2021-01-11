import _mockData from "./_ mockData";

describe("Testing the single event details page", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/postings/event-1");
    cy.request("GET", "https://ivolunteer-api-test.herokuapp.com/events/event-1");
  })

  it("should render event details correctly", () => {
    cy.get(".postings-container")
      .should("contain", "Color Run")
      .and("contain", "Description")
      .and("contain", "The Color Run is an event series and five kilometer paint race, inspired by the Hindu festival of Holi, that is owned and operated by The Color Run LLC, a for-profit company.")
      .and("contain", "Open Positions")
      .and("contain", "Feb 01 2021")
      .and("contain", "Organization")
      .and("contain", "The Color Run, LLC.")
      .and("contain", "Category")
      .and("contain", "Sports")
      .and("contain", "Location")
      .and("contain", "123 Cassette Dr., Denver, CO, 80204")
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

    cy.url().should("include", "/")
  })

  it("Should display upcoming jobs and able to sign up", () => {
    cy.request("PATCH", "https://ivolunteer-api-test.herokuapp.com/events/event-1", {jobId: "posting-1"});
    cy.request("POST", "https://ivolunteer-api-test.herokuapp.com/users/1", { 
      id: "1-posting-1",
      eventId: "event-1",
      eventName: "Color Run",
      positionName: "assisting with check-in",
      date: "2021/02/01"
    });

    cy.get(".posting-position-cards-wrapper")
      .should("contain", "assisting with check-in")
      .and("contain", "Open Spots: 3")
      .and("contain", "tossing color")
      .and("contain", "Open Spots: 5")
      .and("contain", "handing out water")
      .and("contain", "Open Spots: 6");

    cy.get(".posting-positions-card:first")
      .click()
      .should("have.css", "box-shadow", "rgb(46, 196, 182) 2px 2px 3px 0px");

    cy.get(".posting-positions-card:first")
      .click()
      .get(".submit-button")
      .should("contain", "Sign me up!")
      .click();
    
    cy.get(".submit-button")
      .should("be.disabled")
      .get(".posting-positions-card:first")
      .should("have.css", "background-color", "rgb(46, 196, 182)")
      .get(".upcoming-job-cards-wrapper")
      .should("contain", "assisting with check-in")
    
    cy.get(".event-job-title:first")
      .should("contain", "Open Spots: 2")
  })

})
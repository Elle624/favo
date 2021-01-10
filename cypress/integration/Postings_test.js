import _mockData from "./_ mockData";

describe("Testing Postings component", () => {
  beforeEach(() => {
    // cy.visit("http://localhost:3000/");

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "http://localhost:3001/events",
    //   },
    //   {
    //     statusCode: 200,
    //     body: _mockData.events,
    //   }
    // );
  });

  it("Landing on the homepage you can see all event postings", () => {
    cy.get(".posting-title")
      .should("contain", "Organization")
      .and("contain", "Event")
      .and("contain", "Date")
      .and("contain", "Open Position");

    cy.get(".posting-detail")
      .should("contain", "Something Crazy")
      .and("contain", "Something Else, LLC")
      .and("contain", 3)
      .and("contain", "2021/02/01");
  });

  it("Should load title of page on homepage", () => {
    cy.get(".postings-title").contains("Open Volunteer Positions");
  });

  it("Posting card CSS", () => {
    cy.get(".posting-wrapper-cards").should(
      "have.css",
      "border",
      "1px solid rgb(255, 191, 105)"
    );

    cy.get(".posting-wrapper-cards").should("have.css", "display", "flex");

    cy.get(".posting-wrapper-cards").should("have.css", "flex-direction", "row");
  });

  it("Search Input should load and function on homepage postings", () => {
    cy.get(".input-button-sort").should(
      "have.attr",
      "placeholder",
      "i.e Boulder..."
    );

    cy.get(".button-search").contains("search");

    cy.get(".input-button-sort").type("Something");
    cy.get(".button-search").click();

    cy.get(".posting-detail").should("contain", "Something Crazy");

    cy.get(".posting-detail").should("not.contain", "Food Devlivery");
  });

  it("Sort button should load and function on homepage", () => {
    cy.get(".button-sort").contains("sort");

    cy.get(".button-sort").click();

    cy.get(".posting-wrapper-cards:first").contains("Food Delivery");
    cy.get(".posting-wrapper-cards:last").contains("Something Crazy");
  });

  it("Filter postings by categories on should load and function on", () => {
    cy.get(".filter-item").contains("-- select category --");

    cy.get(".filter-box").select("Something");

    cy.get(".posting-wrapper-cards").should("contain", "Something Crazy");
    cy.get(".posting-detail").should("not.contain", "Food Devlivery");
  });

  it.only("should direct to a new URL when a posting card is clicked", () => {

    cy.visit("http://localhost:3000/");

    // cy.intercept(
    //   {
    //     method: "GET",
    //     url: "http://localhost:3001/events/event-1",
    //   },
    //   {
    //     statusCode: 200,
    //     body: _mockData.events[0],
    //   }
    // );
      

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/events",
      },
      {
        statusCode: 200,
        body: _mockData.events,
      }
    );

    cy.get(".posting-wrapper-cards:first")
      .click()
      .url()
      .should("include", "/postings/event-1");
  });
});

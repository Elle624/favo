import _mockData from "./_ mockData";

describe("Testing Postings component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

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

  it("Posting card CSS", () => {
    cy.get(".posting-wrapper").should(
      "have.css",
      "border",
      "1.11111px solid rgb(255, 191, 105)"
    );

    cy.get(".posting-wrapper").should("have.css", "display", "flex");

    cy.get(".posting-wrapper").should("have.css", "flex-direction", "row");
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

    cy.get(".posting-wrapper:first").contains("Food Delivery");
    cy.get(".posting-wrapper:last").contains("Something Crazy");
  });
});

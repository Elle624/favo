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
});

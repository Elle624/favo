import _mockData from "./_ mockData";

describe("Testing homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/users/1",
      },
      {
        statusCode: 201,
        body: _mockData.user,
      }
    );
  });

  it("Landing on the homepage you can see user sidebar with all user basic information", () => {
    cy.get(".username").contains("Peach Perfect");

    cy.get(".profile-picture").should(
      "have.css",
      "background-image",
      'url("https://randomuser.me/api/portraits/men/52.jpg")'
    );

    cy.get(".star-image").should("have.length", 5);

    cy.get(".sidebar-titles")
      .contains("Total Hours Volunteered")
      .get(".sidebar-titles")
      .contains("My Upcoming Jobs")
      .get(".section-line")
      .should("have.length", 2);

    cy.get(".hours-bar").contains("8.2 Hours");
  });

  it("Should display user upcoming jobs on the user profile sidebar", () => {
    cy.get(".job-event-main-detail")
      .contains("cook")
      .get(".job-event-main-detail")
      .contains("2021/03/01")
      .get(".job-event-name")
      .contains("Help students to have a dinner");
  });

  it("Should display toggle sidebar button that hides it", () => {
    cy.get(".user-toggle-button img").should("be.visible").click();

    cy.get(".username").contains("Peach Perfect").should("not.be.visible");
  });

  it("By clicking on an upcoming job the websites sends the user to the event page", () => {
    cy.get(".upcoming-job-card")
      .click()
      .url()
      .should("include", "/postings/event-20");
  });
});

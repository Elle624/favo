describe("Testing homepage", () => {
  
  beforeEach(() => {
    cy.visit("http://localhost:3000/postings");
  });

  it("Landing on the homepage you can see user sidebar with all user basic information", () => {
    cy.get(".username").contains("Katy Terance");

    cy.get(".profile-picture").should(
      "have.css",
      "background-image",
      'url("https://randomuser.me/api/portraits/women/27.jpg")'
    );

    cy.get(".star-image").should("have.length", 5);

    cy.get(".sidebar-titles")
      .contains("Total Hours Volunteered")
      .get(".sidebar-titles")
      .contains("My Upcoming Jobs")
      .get(".section-line")
      .should("have.length", 2);

    cy.get(".hours-bar").contains("10.2 Hours");
  });

  it("Should display user upcoming jobs on the user profile sidebar", () => {
    cy.get(".job-event-main-detail")
      .contains("dog walkers")
      .get(".job-event-main-detail")
      .contains("2021/03/01")
      .get(".job-event-name")
      .contains("Help a local animal shelter");
  });

  it("Should display toggle sidebar button that hides it", () => {
    cy.get(".user-toggle-button-open img").should("be.visible").click();

    cy.get(".username").contains("Katy Terance").should("not.be.visible");
  });

  it("By clicking on an upcoming job the websites sends the user to the event page", () => {
    cy.get(".upcoming-job-card:first")
      .click()
      .url()
      .should("include", "/postings/event-10");
  });
});

describe("Testing Postings component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/postings");
  });

  it("Landing on the postings you can see all event postings", () => {
    cy.get(".posting-title")
      .should("contain", "Organization")
      .and("contain", "Event")
      .and("contain", "Date")
      .and("contain", "Open Position");

    cy.get(".posting-detail")
      .should("contain", "The Color Run")
      .and("contain", "Color Run")
      .and("contain", 3)
      .and("contain", "2021/02/01");
  });

  it("Should load title of page on postings", () => {
    cy.get(".postings-title").contains("Open Volunteer Positions");
  });

  it("Posting card CSS", () => {
    cy.get(".posting-wrapper-cards")
      .should(
        "have.css",
        "border",
        "1.11111px solid rgb(255, 191, 105)"
      );

    cy.get(".posting-wrapper-cards")
      .should("have.css", "display", "flex")
      .and("have.css", "flex-direction", "row");
  });

  it("Search Input should load and function on postings page", () => {
    cy.get(".input-button-sort")
      .should("have.attr", "placeholder", "i.e Boulder...")
      .type("Color")
      .get(".button-search")
      .contains("search")
      .click();

    cy.get(".posting-detail")
      .should("contain", "Color Run")
      .and("not.contain", "Individual");
  });

  it("Sort button should load and function on postings page", () => {
    cy.get(".button-sort")
      .contains("sort")
      .click();

    cy.get(".posting-wrapper-cards:first")
      .contains("The Women of Valor Program")
      .get(".posting-wrapper-cards:last")
      .contains("The Color Run");
  });

  it("Filter postings by categories should load and function on postings page", () => {
    cy.get(".filter-item")
      .contains("-- select category --");

    cy.get(".filter-box")
      .select("Animal")
      .should("have.value", "Animal")
      .should("not.have.value", "Healthcare")

    cy.get(".posting-wrapper-cards")
      .should("contain", "Dumb friends")
      .get(".posting-detail")
      .should("not.contain", "Food Devlivery");
  });

  it("Reset button should load and function after query occured on postings page", () => {
    cy.get(".filter-box")
      .select("Animal")
      .should("have.value", "Animal")

    cy.get(".button-reset")
      .click();
    
    cy.get(".filter-box")
      .should("not.have.value", "Animal")
      .should("have.value", "-- select category --")

    cy.get(".button-reset")
      .should("have.css", "display", "none")
  });

  it("should direct to a new URL when a posting card is clicked", () => {
    cy.get(".posting-wrapper-cards:first")
      .click()
      .url()
      .should("include", "/postings/event-1");
  });
});

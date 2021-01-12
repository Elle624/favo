describe("Testing welcome page", () => {

  it("should open home page and able to re direct to the posting page", () => {
    cy.visit("http://localhost:3000/");

    cy.get(".welcome-page-title")
      .should("contain", "Welcome to FaVo!")
      .get(".welcome-page-tagline")
      .should("contain", "toBee or not toBee, it’s your choice…")
      .get(".welcome-page-button")
      .click()
      .url()
      .should("include", "/postings");
  })
})